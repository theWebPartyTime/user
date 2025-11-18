<template>
    <NavPanel>
        <span class="page-header">Угадай число</span>
    </NavPanel>
    <div class="guess-number">
        <div class="main-section">
            <h1>Заголовок запроса</h1>
            <h2>Это текст для более подробного описания запроса.</h2>
            <div class="input-form">
                <input id="input-number" type="number" required>
                <label for="input-number">Число от 1 до 10</label>
            </div>
            
        </div>
        <PrimaryButton>Отправить</PrimaryButton>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavPanel from '@/components/layout/NavPanel.vue';
import PrimaryButton from '@/components/ui/PrimaryButton.vue';
export default defineComponent({
    name: 'GuessNumber',
    data(){
        return{

        }
    },
    components: {
        NavPanel,
        PrimaryButton
    }
})
</script>

<style>
.page-header{
    color: var(--primary);
    font-weight: 700;
    font-size: 45px;
}
.guess-number{
    display: flex;
    gap: 130px;
    padding: 100px 42px;
    align-items: center;
    flex-direction: column;
}

.guess-number .main-section{
    display: flex;
    flex-direction: column;
    gap: 50px;
    align-items: center;
}

.guess-number .main-section h1, h2{
    margin: 0;
    color: var(--primary);
    font-weight: 800;
}

.guess-number .main-section h1{
    font-size: 40px;
}

.guess-number .main-section h2{
    font-size: 32px;
}

.guess-number .input-form{
    position: relative;
}

.guess-number .input-form input{
    width: 210px;
    padding: 16px;
    border-radius: var(--input-border-radius);
    border: var(--border);
    background: transparent;
    transition: 0.3s;
}

.guess-number .input-form label {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  background: white;
  padding: 0 4px;
  color: #999;
  transition: 0.3s;
  pointer-events: none;
}

.guess-number .input-form input:focus,
.guess-number .input-form input:not(:placeholder-shown) {
  border-color: var(--on-surface-variant);
}

.guess-number .input-form input:focus + label,
.guess-number .input-form input:not(:placeholder-shown) + label {
  top: 0;
  font-size: 12px;
  color: var(--on-surface-variant);
  font-weight: 400;
}

</style>