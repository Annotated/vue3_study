import { onBeforeUnmount, onMounted, ref } from "vue";

export default function () {
    const x = ref(-1);
    const y = ref(-1);

    const clickHandle = (event: MouseEvent) => {
        x.value = event.pageX;
        y.value = event.pageY;
    };

    // 页面加载完成后 绑定鼠标事件
    onMounted(() => {
        window.addEventListener("click", clickHandle);
    });

    // 组件销毁之前 销毁事件
    onBeforeUnmount(() => {
        window.removeEventListener("click", clickHandle);
    });

    return {
        x,
        y
    }

}
