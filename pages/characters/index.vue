<script setup lang="ts">
definePageMeta({
  name: 'home',
});
</script>

<template>
  <div>
    <h1>My Characters</h1>

    <NuxtLink :to="{ name: 'characters-builder' }">
      Create a new character
    </NuxtLink>

    <ui-table
      title="Tabela 1-11: O Druida"
      :headers="['Nível', { text: 'Habilidade de Classe', align: 'start' }]"
      :items="[
        ['1º', 'Devoto, empatia selvagem, magias (1º círculo)'],
        ['2º', 'Caminho dos ermos, poder de druida'],
        ['3º', 'Poder de druida'],
        ['4º', 'Poder de druida'],
        ['5º', 'Poder de druida'],
      ]"
    />
  </div>
</template>
