<template>
    <div class="mt-5">
        <div class="h5 text-center font-weight-light mb-1">
            Share this poll!
        </div>
        
        <div class="p-3">
            <div class="d-flex justify-content-center text-center">
                <poll-social-button
                    network="Facebook"
                    background="#3b5998"
                    class="mr-2"
                    :url="poll.permalink"
                    :title="poll.question"
                    :description="poll.content"
                    :icon="require('../Icons/Facebook').default" />

                <poll-social-button
                    network="Twitter"
                    background="#1da1f2"
                    class="mr-2"
                    :url="poll.permalink"
                    :title="poll.question"
                    :description="poll.content"
                    :icon="require('../Icons/Twitter').default" />

                <poll-social-button
                    network="Email"
                    background="#DD4F48"
                    :url="poll.permalink"
                    :title="poll.question"
                    :description="poll.content"
                    :icon="require('../Icons/Email').default" />
            </div>
            <div v-if="$slots.default" class="mt-3">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
import PollSocialButton from './PollSocialButton';

export default {
    components: {
        PollSocialButton
    },
    props: {
        poll: {
            type: Object,
            required: true
        }
    }
};
</script>