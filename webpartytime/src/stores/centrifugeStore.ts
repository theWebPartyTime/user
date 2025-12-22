import { defineStore } from "pinia";
import { Centrifuge, Subscription } from "centrifuge";

interface CentrifugeState {
  centrifuge: Centrifuge | null;
  mainSub: Subscription | null;
  roomSub: Subscription | null;
  roomCode: string;
  usersOnline: number;
  owner: boolean;
}

export const useCentrifugeStore = defineStore("centrifuge", {
  state: (): CentrifugeState => ({
    usersOnline: 0,
    centrifuge: null,
    mainSub: null,
    roomCode: "",
    roomSub: null,
    owner: false,
  }),

  actions: {
    connect(): void {
      this.centrifuge = new Centrifuge("ws://localhost:8080/join");

      this.centrifuge?.on('message', (response: any) => {
          console.log(response)
      })

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

      this.centrifuge.connect();
    },

    join(code: String): void {
      this.owner = false
      if (this.roomSub != null) {
        this.centrifuge?.removeSubscription(this.roomSub as Subscription);
      }

      this.roomSub = this.centrifuge?.newSubscription(
        "play@" + code,
      ) as Subscription;
      this.roomSub?.subscribe();
    },

    create(username: string): void {
      this.centrifuge
        ?.rpc("createRoom", { hash: "minimal.webparty" })
        .then((response) => {
          this.centrifuge?.removeSubscription(this.roomSub as Subscription);
          const roomCode = response.data.code;
          this.roomSub = this.centrifuge?.newSubscription("watch@" + roomCode, {
            data: username,
          }) as Subscription;

          this.roomSub?.on("subscribed", () => {
            console.log("subscribed to: " + this.roomSub?.channel);
            if (this.roomSub?.channel != null) {
              this.roomCode = this.roomSub.channel.split("@")[1] as string;
            }
          });

          this.roomSub?.on("unsubscribed", () => {
            console.log("unsubscribed from: " + this.roomSub?.channel);
          });

          this.roomSub.subscribe();
          this.owner = true
        });
    },

    start(): void {
      this.centrifuge?.rpc("startRoom", null).then((response) => {
        if (response.data == true) console.log("Room started");
      });
    },
  },
});

export default useCentrifugeStore;
