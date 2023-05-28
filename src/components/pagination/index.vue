<script setup>
/**
 * 分页组件
 */
const props = defineProps({
  index: {
    type: Number,
    default: 1,
  },
});
const emit = defineEmits(["next"]);
const prev = () => {
  console.log(props.index);
  if (props.index > 1) {
    emit("prev");
  }
};
const next = () => {
  emit("next");
};
</script>

<template>
  <div class="pagination">
    <div class="prev dis" @click="prev">
      <svg-icon name="left"></svg-icon>
    </div>
    <div class="page dis">{{ props.index }}</div>
    <div class="next dis" @click="next">
      <svg-icon name="right"></svg-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .dis {
    width: 60px;
    height: 25px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #000;
    background-color: #fff;
    cursor: pointer;
  }
  .page {
    height: 30px;
    color: #fff;
    background-color: #369e8d;
  }
}
</style>
