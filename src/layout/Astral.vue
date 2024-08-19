<!-- sass星空效果 -->
<template>
    <div class="layer1"></div>
    <div class="layer2"></div>
    <!-- <div class="layer3"></div> -->
</template>

<script setup>

</script>

<style lang="scss" scoped>
@function getShadows($n) {
    $shadows: "#{random(100)}vw #{random(100)}vh #f1f1f1";
    @for $i from 2 through $n {
        $shadows: "#{$shadows},#{random(100)}vw #{random(100)}vh #f1f1f1";
    }
    @return unquote($shadows);
}
$duration: 400s;
$count: 800;
@for $i from 1 through 3 {
    $duration: floor($duration / 2);
    $count: floor($count / 2);
    .layer#{$i} {
        $size: #{$i}px;
        position: fixed;
        width: $size;
        height: $size;
        border-radius: 50%;
        // background: red;
        left: 0;
        top: 0;
        box-shadow: getShadows($count);
        animation: moveUp $duration linear infinite;
        &::after {
            content: "";
            position: fixed;
            left: 0;
            top: 100vh;
            width: $size;
            height: $size;
            border-radius: inherit;
            box-shadow: inherit;
        }
    }
}

@keyframes moveUp {
    100% {
        transform: translateY(-100vh);
    }
}
</style>