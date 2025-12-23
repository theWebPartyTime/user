<template>
    <nav class="choose-panel">
        <div class="create-party">
            <button 
                :class="{'active': selectedTab === 'create'}" 
                @click="handleButtonClick('create')"
            >
                Провести вечеринку
            </button>
        </div>
        <div class="connect-to-party">
            <button 
                :class="{'active': selectedTab === 'connect'}" 
                @click="handleButtonClick('connect')"
            >
                Подключиться к вечеринке
            </button>
        </div>
        
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

type ActionType = 'create' | 'connect';

export default defineComponent({
    name: 'ChoosePanel',
    emits: ['action-selected'],
    props: {
        selectedTab: {
            type: String as () => ActionType,
            default: 'create' as ActionType
        }
    },
    methods: {
        handleButtonClick(action: ActionType): void {
            this.$emit('action-selected', action);
        }
    }
})
</script>

<style>
.choose-panel{
    display: flex;
    align-items: end;
    height: 6vh;
    background: var(--background);
    border-bottom: 2px solid var(--outline-variant);
}
.choose-panel div{
    width: 50%;
    text-align: center;
}

.choose-panel div button{
    background: transparent;
    border: 0px;
    font-weight: 500;
    text-decoration: none;
    color: var(--on-surface-variant);
    padding: 12px 0px;
    font-size: 14px;
    cursor: pointer;
}

.choose-panel div button:hover {
    transform: scale(101%, 101%);
}

.active{
    color: var(--primary) !important;
    border-bottom: 3px solid var(--primary) !important;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
}
</style>