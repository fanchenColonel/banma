<template>
    <div id="codemirror" @mouseover="hover" @mouseout="leave">
        <codemirror ref="mycode" :value="isFocus ? val : tip" :options="cmOptions" class="code" @focus="focus" @blur="blur" @input="setVal"></codemirror>

        <div :class="['changeBtn', isHover ? 'active' : '']" @click="fullSet">
            <a-icon v-if="!isFull" type="fullscreen" />
            <a-icon v-else type="fullscreen-exit" />
        </div>
    </div>
</template>
<script>
import { codemirror } from 'vue-codemirror';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/hint/javascript-hint.js';
import 'codemirror/theme/zenburn.css';
import 'codemirror/addon/selection/active-line.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/mode/clike/clike.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/comment/comment.js';
import 'codemirror/addon/dialog/dialog.js';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/search/search.js';
import 'codemirror/keymap/emacs.js';

export default {
    props: {
        placeholder: {
            type: String,
            default: '请输入js增强代码'
        },
        height: {
            type: String,
            default: '100'
        }
    },
    data() {
        return {
            // 在线编辑器配置
            isHover: false,
            isFull: false,
            isFocus: false,
            val: '',
            tip: '',
            cmOptions: {
                tabSize: 2,
                mode: 'text/javascript',
                theme: 'zenburn',
                lineWrapping: true
            }
        };
    },
    mounted() {
        this.tip = this.placeholder;
        this.$nextTick(() => {
            let oCodeMirror = document.getElementsByClassName('CodeMirror')[0];
            oCodeMirror.style.height = this.height + 'px';
        });
    },
    methods: {
        hover() {
            this.isHover = true;
        },
        leave() {
            this.isHover = false;
        },
        fullSet() {
            let oCodeMirror = document.getElementsByClassName('CodeMirror')[0];
            if (this.isFull) {
                oCodeMirror.style.height = '100px';
            } else {
                oCodeMirror.style.height = '500px';
            }
            this.isFull = !this.isFull;
        },
        focus() {
            this.isFocus = true;
        },
        blur() {
            if (this.val != '') {
                this.tip = this.val;
            } else {
                this.tip = this.placeholder;
            }
            this.isFocus = false;
        },
        setVal(val) {
            if (val != this.tip) {
                this.val = val;
                if (this.val != '') {
                    this.$emit('getVal', this.val);
                }
            }
        }
    }
};
</script>
<style lang="less">
.CodeMirror {
    pre {
        line-height: normal !important;
    }
}

.cm-s-zenburn span.cm-keyword {
    color: red;
}

#codemirror {
    position: relative;
}

.changeBtn {
    position: absolute;
    right: 5px;
    top: 5px;
    height: 20px;
    width: 20px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    opacity: 0;
    cursor: pointer;
    z-index: 99;
    &.active {
        opacity: 1;
    }
}
</style>
