import { ref } from "vue"


/**
 * 画布中绘制矩形
 * 参数: cav-画布对象  list-矩形数组 i-选中矩形下标
 **/


/**
 * selectedGraphicsIndex: 当前选中的矩形下标
 */
export let selectedGraphicsIndex = null;
export let drawList = ref([])

//画图-是否要求在 画布内作画，默认否
let isCtxCanvasScope = false;


/* 操作执行方法分发 */
export function draw(cav, list, i, isCtxScope = true) {
    // 画布初始化
    let ctx = cav.getContext('2d');
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;

    isCtxCanvasScope = isCtxScope
    console.log("是否在画布内作画:", { isCtxCanvasScope });

    // 变量初始化
    let sX = 0; // 鼠标X坐标
    let sY = 0; // 鼠标Y坐标

    /*
     *鼠标移动进行第一层判断, 区分情况: 无矩形, 已有矩形无选中, 已有选中矩形
     */
    cav.onmousemove = function (em) {
        sX = em.offsetX;
        sY = em.offsetY;
        let iem = undefined; // 鼠标移动时临时存储当前鼠标所在矩形的下标

        if (list.length === 0) { // **** 无矩形 ****
            // 绘制新矩形
            newDraw(cav, ctx, list);
            selectedGraphicsIndex = null;
        } else if (i === undefined) { // **** 已有矩形无选中 ****
            selectedGraphicsIndex = null;
            // 判断鼠标位置
            list.forEach(function (value, index) {
                if (value.w > 0 && value.h > 0 && sX > value.x && sX < value.x + value.w && sY > value.y && sY < value.y + value.h) {
                    // 鼠标在右下方向生成的矩形中
                    iem = index;
                    judgeDraw(cav, ctx, list, iem);
                }
                if (value.w < 0 && value.h > 0 && sX < value.x && sX > value.x + value.w && sY > value.y && sY < value.y + value.h) {
                    // 鼠标在左下方向生成的矩形中
                    iem = index;
                    judgeDraw(cav, ctx, list, iem);
                }
                if (value.w > 0 && value.h < 0 && sX > value.x && sX < value.x + value.w && sY < value.y && sY > value.y + value.h) {
                    // 鼠标在右上方向生成的矩形中
                    iem = index;
                    judgeDraw(cav, ctx, list, iem);
                }
                if (value.w < 0 && value.h < 0 && sX < value.x && sX > value.x + value.w && sY < value.y && sY > value.y + value.h) {
                    // 鼠标在左上方向生成的矩形中
                    iem = index;
                    judgeDraw(cav, ctx, list, iem);
                }
                if (iem === undefined) {
                    // 鼠标不在矩形中
                    newDraw(cav, ctx, list);
                }
            })
        } else { // **** 已有选中矩形 ****
            // 判断鼠标位置
            for (let index = 0; index < list.length; index++) {
                let value = list[index];
                if (sX < value.x + 5 && sX > value.x - 5 && sY < value.y + 5 && sY > value.y - 5) {
                    // ***  鼠标在起点角  ***
                    if (index === i) {
                        changeDraw(cav, ctx, list, i, 1);
                        break;
                    }
                } else if (sX < value.x + value.w + 5 && sX > value.x + value.w - 5 && sY < value.y + 5 && sY > value.y - 5) {
                    // ***  鼠标在起点横向角  ***
                    if (index === i) {
                        changeDraw(cav, ctx, list, i, 2);
                        break;
                    }

                } else if (sX < value.x + 5 && sX > value.x - 5 && sY < value.y + value.h + 5 && sY > value.y + value.h - 5) {
                    // ***  鼠标在起点纵向角  ***
                    if (index === i) {
                        changeDraw(cav, ctx, list, i, 3);
                        break;
                    }

                } else if (sX < value.x + value.w + 5 && sX > value.x + value.w - 5 && sY < value.y + value.h + 5 && sY > value.y + value.h - 5) {
                    // ***  鼠标在终点角  ***
                    if (index === i) {
                        changeDraw(cav, ctx, list, i, 4);
                        break;
                    }

                } else if (value.w > 0 && value.h > 0 && sX > value.x && sX < value.x + value.w && sY > value.y && sY < value.y + value.h) {
                    // ***  鼠标在右下方向生成的矩形中  ***
                    iem = index
                    judgeDraw(cav, ctx, list, index);
                    break;

                } else if (value.w < 0 && value.h > 0 && sX < value.x && sX > value.x + value.w && sY > value.y && sY < value.y + value.h) {
                    // ***  鼠标在左下方向生成的矩形中  ***
                    iem = index
                    judgeDraw(cav, ctx, list, index);
                    break;

                } else if (value.w > 0 && value.h < 0 && sX > value.x && sX < value.x + value.w && sY < value.y && sY > value.y + value.h) {
                    // ***  鼠标在右上方向生成的矩形中  ***
                    iem = index
                    judgeDraw(cav, ctx, list, index);
                    break;

                } else if (value.w < 0 && value.h < 0 && sX < value.x && sX > value.x + value.w && sY < value.y && sY > value.y + value.h) {
                    // ***  鼠标在左上方向生成的矩形中  ***
                    iem = index
                    judgeDraw(cav, ctx, list, index);
                    break;

                } else {
                    if (iem === undefined) {
                        // *** 鼠标不在矩形中 ***
                        newDraw(cav, ctx, list);
                        selectedGraphicsIndex = null;
                    }
                }
            }
        }

        /* 鼠标移出画布区域时保存选中矩形下标(如有) */
        cav.onmouseout = function () {
            if (i !== undefined) {
                // 初始化
                draw(cav, list, i, isCtxCanvasScope);
            }
        };
    }

    drawList.value = []
    drawList.value = list
    console.log(drawList.value, 'drawListdrawList矩形列表900');

}

/* 编辑矩形四个角 */
function changeDraw(cav, ctx, list, i, site) {
    cav.style.cursor = 'pointer'

    // site: 操作矩形角的位置, 1-起点 2-起点横向 3-起点纵向 4-终点
    let mark = list[i];

    /* 按下鼠标左键 */
    cav.onmousedown = function (ed) {
        // 保存鼠标落下位置的X, Y坐标, firefox中鼠标移动后ed.offsetX ed.offsetY会变成 0, 需要使用临时参数存储起来
        let sX = ed.offsetX; // 起点X坐标
        let sY = ed.offsetY; // 起点Y坐标
        let W = mark.w; //获取最初的数据
        let H = mark.h;
        let X = mark.x;
        let Y = mark.y;

        /* 移动鼠标 */
        cav.onmousemove = function (em) {
            // 计算绘制数据
            let iframe = {}
            switch (site) {
                case 1:
                    iframe = {
                        x: em.offsetX,
                        y: em.offsetY,
                        w: W + (sX - em.offsetX),
                        h: H + (sY - em.offsetY)
                    }
                    if (isCtxCanvasScope) {
                        let w = W + sX - em.offsetX;
                        let h = H + sY - em.offsetY;
                        let obj = isboundary(cav, em.offsetX, em.offsetY, w, h); //获取最终边界坐标
                        iframe = {
                            x: obj.x,
                            y: obj.y,
                            w: obj.w,
                            h: obj.h
                        }
                    }
                    break;

                case 2:
                    iframe = {
                        x: X,
                        y: em.offsetY,
                        w: W - sX + em.offsetX,
                        h: H + sY - em.offsetY
                    }
                    if (isCtxCanvasScope) {
                        let w = W - sX + em.offsetX;
                        let h = H + sY - em.offsetY;
                        let obj = isboundary(cav, X, em.offsetY, w, h); //获取最终边界坐标
                        iframe = {
                            x: obj.x,
                            y: obj.y,
                            w: obj.w,
                            h: obj.h
                        }
                    }
                    break;

                case 3:
                    iframe = {
                        x: em.offsetX,
                        y: em.offsetY - (H - sY + em.offsetY),
                        w: W + sX - em.offsetX,
                        h: H - sY + em.offsetY
                    }
                    if (isCtxCanvasScope) {
                        let w = W + sX - em.offsetX;
                        let h = H - sY + em.offsetY;
                        let obj = isboundary(cav, em.offsetX, em.offsetY - h, w, h); //获取最终边界坐标
                        iframe = {
                            x: obj.x,
                            y: obj.y,
                            w: obj.w,
                            h: obj.h
                        }
                    }
                    break;

                case 4:
                    iframe = {
                        x: X,
                        y: Y,
                        w: W - sX + em.offsetX,
                        h: H - sY + em.offsetY
                    }
                    if (isCtxCanvasScope) {
                        let w = W - sX + em.offsetX;
                        let h = H - sY + em.offsetY;
                        let obj = isboundary(cav, X, Y, w, h); //获取最终边界坐标
                        iframe = {
                            x: obj.x,
                            y: obj.y,
                            w: obj.w,
                            h: obj.h
                        }
                    }
                    break;
            }
            //保留其中其他参数
            for (let key in iframe) {
                list[i][key] = iframe[key];
            }
            // 重新绘制
            reDraw(cav, ctx, list, i);
        }

        /* 鼠标离开矩形区 */
        cav.onmouseout = function () {
            // 重新绘制
            reDraw(cav, ctx, list);
            // 初始化
            draw(cav, list, null, isCtxCanvasScope)
        };

        /* 监听键盘, 点击后可以控制删除, 由于移动矩形事件已经监听了onmousemove, 所以在移动矩形方法中仍有一次调用 */
        delDraw(cav, ctx, list, i);
    }

}

/* 绘制新矩形 */
function newDraw(cav, ctx, list) {
    cav.style.cursor = 'crosshair'
    // 初始化变量
    let start = false; // 画框状态, false时不执行画框操作
    let sX = 0; // 起点X坐标
    let sY = 0; // 起点Y坐标

    /* 按下鼠标左键 */
    cav.onmousedown = function (ed) {
        /* 使用变量 */
        start = true;
        sX = ed.offsetX;
        sY = ed.offsetY;

        /* 重置按键监听, 防止选中取消后仍可删除 */
        delDraw(cav, ctx, list, null)

        /* 鼠标移动 */
        cav.onmousemove = function (em) {
            if (start) {
                // 重新绘制
                reDraw(cav, ctx, list);
                // 设置边框为虚线
                ctx.beginPath();
                ctx.setLineDash([8, 4]);
                ctx.rect(sX, sY, em.offsetX - sX, em.offsetY - sY);
                ctx.stroke();
            }
        }

        /* 鼠标抬起 */
        cav.onmouseup = function (eu) {
            if (start && Math.abs(eu.offsetX - sX) > 10 && Math.abs(eu.offsetY - sY) > 10) {
                // 改变矩形数组
                let frame = {
                    x: sX, y: sY, w: eu.offsetX - sX, h: eu.offsetY - sY
                };
                if (isCtxCanvasScope) {
                    let obj = isboundary(cav, sX, sY, eu.offsetX - sX, eu.offsetY - sY); //获取最终边界坐标
                    frame = {
                        x: obj.x, y: obj.y, w: obj.w, h: obj.h
                    };
                }

                list.push(frame);
                // 重新绘制
                reDraw(cav, ctx, list);
                // 改变画框状态
                start = false
                // 初始化
                draw(cav, list, null, isCtxCanvasScope)
            } else {
                // 重新绘制
                reDraw(cav, ctx, list);
                // 改变画框状态
                start = false
                // 初始化
                draw(cav, list, null, isCtxCanvasScope)
            }
        };

        /* 鼠标离开矩形区 */
        cav.onmouseout = function (eo) {
            if (start && Math.abs(eo.offsetX - sX) > 10 && Math.abs(eo.offsetY - sY) > 10) {
                // 改变矩形数组
                let frame = {
                    x: sX, y: sY, w: eo.offsetX - sX, h: eo.offsetY - sY
                };
                if (isCtxCanvasScope) {
                    let obj = isboundary(cav, sX, sY, eo.offsetX - sX, eo.offsetY - sY); //获取最终边界坐标
                    frame = {
                        x: obj.x, y: obj.y, w: obj.w, h: obj.h
                    };
                }
                list.push(frame);
                // 重新绘制
                reDraw(cav, ctx, list);
                // 改变画框状态
                start = false;
                // 初始化
                draw(cav, list, null, isCtxCanvasScope)
            } else {
                // 重新绘制
                reDraw(cav, ctx, list);
                // 改变画框状态
                start = false
                // 初始化
                draw(cav, list, null, isCtxCanvasScope)
            }
        };
    }
}

/* 选中矩形, 重绘矩形, 并分发后续事件 */
function judgeDraw(cav, ctx, list, iem) {
    cav.style.cursor = 'default'
    // 初始化变量
    let sX = 0; // 起点X坐标
    let sY = 0; // 起点Y坐标

    /* 按下鼠标左键 */
    cav.onmousedown = function (ed) {
        // console.log("按下鼠标左键");
        sX = ed.offsetX;
        sY = ed.offsetY;

        // 更改选中状态, 重绘矩形
        reDraw(cav, ctx, list, iem);

        /* 当仅点击选中矩形便抬起鼠标后, 重新初始化画布 */
        cav.onmouseup = function () {
            // 重绘矩形
            reDraw(cav, ctx, list, iem);

            // 初始化
            draw(cav, list, iem, isCtxCanvasScope);
        };

        /* 按住拖动鼠标, 移动选中矩形*/
        moveDraw(cav, ctx, list, iem, sX, sY);

        /* 监听键盘, 点击后可以控制删除, 由于移动矩形事件已经监听了onmousemove, 所以在移动矩形方法中仍有一次调用 */
        delDraw(cav, ctx, list, iem);

    }
    selectedGraphicsIndex = iem;

}


/* 移动矩形 */
function moveDraw(cav, ctx, list, i, sX, sY) {
    let mark = list[i]
    let X = mark.x
    let Y = mark.y

    cav.onmousemove = function (em) {
        let iframe = {
            x: X + em.offsetX - sX,
            y: Y + em.offsetY - sY,
            w: mark.w,
            h: mark.h
        }
        if (isCtxCanvasScope) {
            let x = X + em.offsetX - sX;
            let y = Y + em.offsetY - sY;
            let obj = isboundary(cav, x, y, mark.w, mark.h); //获取最终边界坐标
            //只能在画布内画画
            iframe = {
                x: obj.x,
                y: obj.y,
                w: obj.w,
                h: obj.h
            }
        }
        // list.splice(i, 1, iframe);
        //保留其中其他参数
        for (let key in iframe) {
            list[i][key] = iframe[key];
        }
        /* 监听键盘, 使矩形在移动后仍可删除, 在点击未移动过的矩形时仍有一次监听 */
        delDraw(cav, ctx, list, i);
        // 重新绘制
        reDraw(cav, ctx, list, i);
    }

    cav.onmouseup = function () {
        // 重绘矩形
        reDraw(cav, ctx, list, i);

        // 初始化
        draw(cav, list, i, isCtxCanvasScope);
    };
}

/* 删除矩形 */
function delDraw(cav, ctx, list, i) {
    /* 按键事件 */
    if (i === null) {
        // i为null时阻止按键监听事件冒泡
        cav.onkeydown = function () {
            return false;
        }
    } else {
        // 监听按键事件
        cav.onkeydown = function (k) {
            let key = k.keyCode || k.which;
            if (key == 8 && i !== null) {
                if (list.length >= 1) {
                    // 删除数组元素
                    list.splice(i, 1);
                    // 重绘矩形
                    reDraw(cav, ctx, list);
                } else {
                    /* 矩形数组长度为0, 已将矩形框全部删除 */
                    ctx.clearRect(0, 0, cav.width, cav.height);
                }
                // 重置监听状态, 防止删除完毕后, 按键监听不消失
                delDraw(cav, ctx, list, null)
                // 重绘矩形
                reDraw(cav, ctx, list);
                // 初始化
                draw(cav, list, null, isCtxCanvasScope);
            }
        }
    }
}

/* 重绘所有矩形 */
function reDraw(cav, ctx, list, i) {
    ctx.setLineDash([8, 0]); // 设置边框为实线
    ctx.clearRect(0, 0, cav.width, cav.height);
    // 绘制未选中部分
    list.forEach(function (value, index) {
        if (i === undefined || index != i) {
            ctx.beginPath();
            ctx.strokeStyle = 'blue';
            ctx.rect(value.x, value.y, value.w, value.h);
            ctx.stroke();
        }
    });
    // 绘制已选中部分
    list.forEach(function (value, index) {
        if (index === i) {
            /* 绘制方框 */
            ctx.beginPath();
            ctx.strokeStyle = 'red';
            ctx.rect(value.x, value.y, value.w, value.h);
            ctx.fillStyle = 'RGBA(102,102,102,0.2)'
            ctx.fillRect(value.x, value.y, value.w, value.h);
            ctx.stroke();
            // 绘制四个角的圆圈
            ctx.beginPath();
            ctx.strokeStyle = 'red';
            ctx.arc(value.x, value.y, 4, 0, Math.PI * 2)
            ctx.fillStyle = "white";
            ctx.fill();// 画起点实心圆
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(value.x, value.y + value.h, 4, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.fill();// 画起点纵向实心圆
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(value.x + value.w, value.y + value.h, 4, 0, Math.PI * 2); //
            ctx.fillStyle = "white";
            ctx.fill();// 画起点横向实心圆
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(value.x + value.w, value.y, 4, 0, Math.PI * 2); //右下角
            ctx.fillStyle = "white";
            ctx.fill();// 画终点实心圆
            ctx.stroke();
        }
    })
}

/**
 * 判断边界
 * @param {*} x 移动x的坐标
 * @param {*} y 移动y的坐标
 * @param {*} markW 矩形的宽度
 * @param {*} markH 矩形的高度
 * @returns {*} x: 返回最终的x坐标，y：返回最终的y坐标, w:最终的宽度，h：最终的高度
 */
function isboundary(cav, x, y, markW, markH) {
    let width = cav.width;
    let height = cav.height;
    if (x < 0) {
        x = 0
    } else if ((x + markW) > width) { //当x超过 最大画布宽度则取画布宽度 - 矩形的宽度
        x = width - markW - 4 > 0 ? width - markW - 4 : 0
    }

    if (y < 0) {
        y = 0
    } else if ((y + markH) > height) {  //当y超过 最大画布宽度则取画布宽度 - 矩形的高度
        y = height - markH - 4 > 0 ? height - markH - 4 : 0
    }

    return { x, y, w: markW, h: markH }
}
