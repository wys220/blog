// 按需引入element-plus
import {
    ElButton,
    ElInput,
    ElIcon,
    ElProgress,
    ElColorPicker,
    ElInputNumber,
    ElImage
} from 'element-plus';
import 'element-plus/dist/index.css'; // 引入样式

export default {
    install(app) {
        // 注册组件
        app.component(ElButton.name, ElButton);
        app.component(ElInput.name, ElInput);
        app.component(ElIcon.name, ElIcon);
        app.component(ElProgress.name, ElProgress);
        app.component(ElColorPicker.name, ElColorPicker);
        app.component(ElInputNumber.name, ElInputNumber);
        app.component(ElImage.name, ElImage);
    },
};
