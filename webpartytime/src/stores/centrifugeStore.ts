import { defineStore } from "pinia";
import { Centrifuge, Subscription } from "centrifuge";

interface CentrifugeState {
  centrifuge: Centrifuge | null;
  mainSub: Subscription | null;
  roomSub: Subscription | null;
  roomCode: string;
  roomCreatedAt: Date,
  usersOnline: number;
  owner: boolean;
  nicknameMappings: any;
  spectatorMode: boolean;
}

export type RoomConfig = {
  allowSpectators: boolean;
	allowJoins:     boolean;
	allowAnonymous:  boolean;
	autoStart:       boolean;
}

export const useCentrifugeStore = defineStore("centrifuge", {
  state: (): CentrifugeState => ({
    usersOnline: 0,
    centrifuge: null,
    mainSub: null,
    roomCode: "",
    roomSub: null,
    roomCreatedAt: new Date(),
    owner: false,
    nicknameMappings: {"all": {}, "owner": ""},
    spectatorMode: false,
  }),

  actions: {
    connect(): void {
      this.centrifuge = new Centrifuge("ws://localhost:8080/join");

      this.centrifuge?.on('message', (response: any) => {
          console.log(response)
      })
      
      this.centrifuge.connect();
      this.mainSub = this.centrifuge.newSubscription("main");
      this.mainSub?.subscribe();

      this.mainSub.presenceStats().then((result) => {
        this.usersOnline = result.numClients;
      });
      
      this.mainSub.on("join", () => {
        this.usersOnline += 1;
      });
      
      this.mainSub.on("leave", () => {
        this.usersOnline -= 1;
      });

      this.centrifuge.on('message', (response) => {
        console.log("message: ", response)
        if ("type" in response.data) {
          switch (response.data["type"]) {
            case "nicknames":
              this.nicknameMappings["all"] = response.data["message"]["all"]
              this.nicknameMappings["owner"] = response.data["message"]["owner"]
              this.nicknameMappings["self"] = response.data["message"]["self"]
              break
            case "room_created_at":
              this.roomCreatedAt = new Date(response.data["message"]["timestamp"])
              break
          }
        }
      })
    },

    join(nickname: string, code: string, spectatorMode: boolean,
         onstarted: () => void, onended: () => void): Promise<Boolean> {

      if (this.roomSub != null) {
        this.centrifuge?.removeSubscription(this.roomSub as Subscription);
        this.nicknameMappings = {"all": {}, "owner": ""}
      }

      this.roomSub = this.centrifuge?.newSubscription(
        (spectatorMode ? "watch@" : "play@") + code, { data: nickname }) as Subscription;
      this.roomSub?.subscribe();

      this.roomSub?.on('publication', (response) => {
        console.log(response)

        switch (response.data["type"]) {
          case "new_nickname":
            this.nicknameMappings["all"][response.data["message"]["id"]] = response.data["message"]["nickname"]
            break
          case "remove_nickname":
            delete this.nicknameMappings["all"][response.data["message"]["id"]]
            break
          case "room_started":
            onstarted()
            break
          case "room_ended":
            onended()
            break
          case "unsubscribe":
            this.exitRoom()
            break
        }

      })
      
      return new Promise((resolve) => {
        this.roomSub?.on("subscribed", () => {
          if (this.roomSub?.channel != null) {
            resolve(true)
            this.owner = false
            this.spectatorMode = spectatorMode
            if (spectatorMode) onstarted()
          }
        });

        this.roomSub?.on("unsubscribed", () => {
          resolve(false)
        });
      })

    },

    create(nickname: string, onstarted: () => void, onended: () => void): void {
      this.centrifuge
        ?.rpc("createRoom", { hash: "minimal.webparty" })
        .then((response) => {
          this.centrifuge?.removeSubscription(this.roomSub as Subscription);
          const roomCode = response.data.code;
          this.roomCreatedAt = response.data.createdAt
          this.roomSub = this.centrifuge?.newSubscription("watch@" + roomCode, {
            data: nickname,
          }) as Subscription;

          this.roomSub?.on("subscribed", () => {
            console.log("subscribed to: " + this.roomSub?.channel);
            if (this.roomSub?.channel != null) {
              this.roomCode = this.roomSub.channel.split("@")[1] as string;
              this.nicknameMappings = {"all": {}, "owner": nickname}
              this.owner = true
            }
          });

          this.roomSub?.on("unsubscribed", () => {
            console.log("unsubscribed from: " + this.roomSub?.channel);
          });

          this.roomSub?.on('publication', (response) => {
            console.log(response)
            switch (response.data["type"]) {
              case "new_nickname":
                this.nicknameMappings["all"][response.data["message"]["id"]] = response.data["message"]["nickname"]
                console.log(this.nicknameMappings)
                break
              case "room_started":
                onstarted()
                break
              case "room_ended":
                onended()
                break
              case "remove_nickname":
                if (response.data["message"]["id"] == this.nicknameMappings["self"]) {
                  console.log("unsub")
                  this.exitRoom()
                }
                delete this.nicknameMappings["all"][response.data["message"]["id"]]
                break
            }
          })

          this.roomSub.subscribe();
        });
    },

    exitRoom(): void {
      if (this.roomSub != null) {
        this.centrifuge?.removeSubscription(this.roomSub as Subscription)
      }
    },

    removeParticipant(id: string): void {
      this.centrifuge?.send({type: "kick",
        content: {"userID": id}
      })
    },

    updateRoomConfig(updated: RoomConfig): void {
      if (this.owner) {
        this.centrifuge?.send({type: "room_config_changed", 
          content: {config: updated}
        })
      }
    },

    sendInput(message: string, type: string, step: number) {
      console.log(message)
      
      if (!this.owner) {
        this.centrifuge?.send({type: "input", 
          content: {type: type, step: step, message: message}
        })
      }
    },

    start(): void {
      this.centrifuge?.rpc("startRoom", null).then((response) => {
        console.log(response)
        if (response.data == true) console.log("Room started");
      });
    },
  },
});

export default useCentrifugeStore;
