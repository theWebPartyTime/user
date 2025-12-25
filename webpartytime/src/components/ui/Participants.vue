<template>
    <div class="participants">
        <div v-if="!owner" class="organizer">
            <Identicon
            :username="nicknameMappings['owner']"
            class="participant-avatar"
            />
            
            <div class="participant-info">
                <div class="participant-role">Организатор</div>
                <div class="organizer-name">
                    {{ nicknameMappings['owner'] }}
                </div>
            </div>
        </div>

        <div class="participants-list">
            <div v-for="(nickname, id) in nicknameMappings['all']" :key="id">
                <div class="organizer">
                    <Identicon
                        :username="nickname"
                        class="participant-avatar"
                    />

                    <div class="participant-info">
                        <div class="participant-role">Участник</div>
                        <div class="organizer-name">
                            {{ nickname }}
                        </div>
                    </div>

                    <img v-if="owner"
                        src="@/assets/delete_participant.svg"
                        alt=""
                        @click="removeParticipant(id as string)"
                        class="delete-participant-img"
                    />
                </div>
            </div>

            <div v-if="!owner" class="room-settings-container">
              <div class="duration-of-game-bar">
                <img src="@/assets/alarm.svg" alt="" />
                <div class="access-main">
                  <span class="access-main-setting-name"
                    >Время работы комнаты</span
                  >
                  <span class="access-main-setting-value"><CreatedTimer /></span>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Identicon from "@/components/ui/Identicon.vue";
import useCentrifugeStore from "../../stores/centrifugeStore";
import { mapState, mapActions } from "pinia";
import CreatedTimer from "@/components/ui/CreatedTimer.vue";

export default defineComponent({
  name: "Participants",
  data() {
    return {};
  },

  components: {
    Identicon,
    CreatedTimer,
  },

  methods: {
    ...mapActions(useCentrifugeStore, ["removeParticipant"])
  },

  computed: {
    ...mapState(useCentrifugeStore, ["nicknameMappings", "owner", "centrifuge"])
  },
});
</script>

<style>
.participant-view .selected-game-info {
  width: auto;
  min-width: 60%;
  max-width: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.participant-view .selected-game-card {
  width: auto;
  min-width: 50%;
  max-width: 52%;
  min-height: 400px;
  max-height: 500px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  background: var(--background);
  border: 2px solid var(--outline-variant);
  border-radius: 12px;
}

.participants {
    height: 90%;
}

.participant-view .participants {
  display: flex;
  flex-direction: column;
  position: relative;
  width: auto;
  min-width: 15%;
  max-width: 17%;
}

.participants .organizer {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding: 8px 0px 8px 16px;
  gap: 12px;
}

.participants .organizer .participant-avatar {
  aspect-ratio: 1;
  height: 45px;
  display: block;
  background: var(--primary-container);
  border-radius: 50%;
}

.participants .organizer .participant-avatar svg {
  height: 40px;
  aspect-ratio: 1;
  margin: 2.5px;
}

.participants .organizer .participant-info .organizer-name {
  width: 80%;
}

.participants-list .participant:first-child {
  border-top: var(--border-variant);
}

.participants .organizer .participant-info {
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.participants-list {
  display: flex;
  flex-direction: column;
}

.participant-view .participant {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
}

.participant-view .participant .participant-info {
  min-width: 90%;
  width: auto;
  display: flex;
  flex-direction: row;
  gap: 5%;
  align-items: center;
}

.participant-view
  .participants
  .participants-list
  .participant
  .participant-info {
  min-width: 90%;
}

.participant-view .participant .participant-info .participant-info-main {
  display: flex;
  flex-direction: column;
}

.participants .participants-list .participant {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
}

.participants .participants-list .participant:hover {
  background: var(--background);
}

.participants .participants-list .participant .participant-info {
  min-width: 80%;
  width: auto;
  display: flex;
  flex-direction: row;
  gap: 5%;
  align-items: center;
}

.participants .participants-list .participant .participant-info-main {
  display: flex;
  flex-direction: column;
}

.participants .participant-role {
  font-size: 12px;
  font-weight: 500;
  color: var(--on-surface-variant);
  line-height: 1.3;
  letter-spacing: 0.5px;
}

.participant-username {
  font-size: 15px;
  color: var(--on-surface);
}

.participant .participant-avatar {
  aspect-ratio: 1;
  height: 35px;
  display: block;
  background: var(--primary-container);
  border-radius: 50%;
}

.participant .participant-avatar svg {
  aspect-ratio: 1;
  height: 30px;
  margin: 2.5px;
}

.participant .delete-participant-img {
  width: 18px;
  aspect-ratio: 1;
  cursor: pointer;
}

.room-settings-container .duration-of-game-bar {
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  gap: 6px;
  padding: 8px 16px;
}

.room-settings-container .duration-of-game-bar img {
  width: 18px;
  aspect-ratio: 1;
}

.access-main {
  display: flex;
  flex-direction: column;
}

.access-main-setting-name {
  color: var(--on-surface-variant);
  font-size: 12px;
  letter-spacing: 0.5px;
  line-height: 1.33;
  font-weight: 500;
}

.access-main-value-name {
  font-size: 16px;
  color: var(--on-surface);
}
</style>
