<template>
    <div class="img-loader" :class="{'is-loading': isLoading}">
        <activity-indicator
            v-if="isLoading"
            type="pulse"
            center
            :height="height"
            :max-height="maxHeight"
            :min-height="minHeight" />
            
        <img v-lazy :data-src="src" v-bind="$attrs" class="d-flex w-100" @load="show">
    </div>
</template>

<script>
import Lazy from '@vue-interface/lazy';
import { register } from '@vue-interface/activity-indicator';

register({
    pulse: () => import(/* webpackChunkName: 'vue-interface', webpackPrefetch: true */'@vue-interface/activity-indicator').then(({ Pulse }) => Pulse)
});

export default {
    components: {
        ActivityIndicator: () => import(/* webpackChunkName: 'vue-interface', webpackPrefetch: true */'@vue-interface/activity-indicator').then(({ ActivityIndicator }) => ActivityIndicator)
    },
    directives: {
        Lazy
    },
    inheritAttrs: false,
    props: {
        height: [Number, String],
        maxHeight: [Number, String],
        minHeight: [Number, String],
        loading: {
            type: Boolean,
            default: true
        },
        src: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            isLoading: this.loading,
            isShowingImage: !this.loading
        };
    },
    methods: {
        hide() {
            this.isLoading = true;
        },
        show() {
            this.isLoading = false;
        }
    }
};
</script>
<style>
.img-loader.is-loading img {
    opacity: 0;
    position: absolute;
    z-index: -1;
}
</style>