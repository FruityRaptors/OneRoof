(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7836384d"],{"0bc6":function(t,e,s){},"293a":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"view chat"},[s("v-container",{staticClass:"chat-box orange lighten-5",attrs:{id:"chat-box",color:"brown lighten-4"},on:{update:function(e){return t.$vuetify.goTo(99999)}}},t._l(t.messages,(function(e){return s("v-card",{key:e.id,class:e.username==t.username?"text-right d-flex align-end flex-column mx-auto orange lighten-5 pr-0 mb-0":"text-left d-flex align-start flex-column  mx-auto orange lighten-5 mb-0",attrs:{elevation:"0"}},[s("v-subheader",{staticClass:"lighten-4 mb-0 pa-0",attrs:{elevation:"0","max-width":"200",height:"20"}},[s("v-avatar",{attrs:{size:"20"}},[s("Avatar",{attrs:{src:e.image,username:e.username,size:20}})],1),s("v-card-subtitle",{staticClass:"d-inline-flex"},[t._v(" "+t._s(e.username)+" ")])],1),s("v-card",{staticClass:"mb-2 mr-4 pa-2",attrs:{rounded:"","max-width":"250",color:e.username==t.username?"orange accent-2 font-weight-light text-justify":"orange accent-1 font-weight-light"}},[t._v(t._s(e.content)+" ")])],1)})),1),s("v-footer",{attrs:{rounded:"","max-height":"100",color:"orange lighten-4",padless:""}},[s("v-text-field",{staticClass:"d-flex align-start mt-3 pl-5",attrs:{type:"text",placeholder:"Write your message..."},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.sendMessage(),t.$vuetify.goTo(99999)}},model:{value:t.inputMessage,callback:function(e){t.inputMessage=e},expression:"inputMessage"}}),s("v-btn",{staticClass:"mr-2 orange lighten-4",attrs:{fab:"",elevation:"0"},on:{click:function(e){e.preventDefault(),t.sendMessage(),t.$vuetify.goTo(99999)}}},[s("v-icon",{attrs:{color:"orange darken-1"}},[t._v(" mdi-send ")])],1)],1)],1)},i=[],n=(s("159b"),s("b64b"),s("2591")),o=s("4a89"),r=s.n(o),u={name:"Chat",data:function(){return{inputMessage:"",messages:[],username:this.$store.state.user.username,lastMessage:""}},components:{Avatar:r.a},created:function(){var t=this,e=n["a"].database().ref(this.$store.state.user.house_keys[0]).limitToLast(50);e.on("value",(function(e){var s=e.val(),a=[];Object.keys(s).forEach((function(t){a.push({id:t,username:s[t].username,content:s[t].content,image:s[t].image})})),t.messages=a,t.scrollBottom()}))},methods:{sendMessage:function(){var t=n["a"].database().ref(this.$store.state.user.house_keys[0]);if(""!==this.inputMessage&&null!==this.inputMessage){var e={username:this.$store.state.user.username,content:this.inputMessage,image:this.$store.state.user.photo_url};t.push(e),this.lastMessage=this.messages[this.messages.length-1].username,this.inputMessage=""}},scrollBottom:function(){return this.$vuetify.goTo(99999)}}},l=u,c=s("2877"),h=s("6544"),d=s.n(h),f=s("8212"),p=s("8336"),g=s("b0af"),m=s("99d9"),b=s("a523"),v=s("5530"),x=(s("a9e3"),s("c7cd"),s("b5b6"),s("8dd9")),y=s("3a66"),$=s("d10f"),k=s("58df"),C=s("80d2"),j=Object(k["a"])(x["a"],Object(y["a"])("footer",["height","inset"]),$["a"]).extend({name:"v-footer",props:{height:{default:"auto",type:[Number,String]},inset:Boolean,padless:Boolean,tag:{type:String,default:"footer"}},computed:{applicationProperty:function(){return this.inset?"insetFooter":"footer"},classes:function(){return Object(v["a"])(Object(v["a"])({},x["a"].options.computed.classes.call(this)),{},{"v-footer--absolute":this.absolute,"v-footer--fixed":!this.absolute&&(this.app||this.fixed),"v-footer--padless":this.padless,"v-footer--inset":this.inset})},computedBottom:function(){if(this.isPositioned)return this.app?this.$vuetify.application.bottom:0},computedLeft:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.left:0},computedRight:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.right:0},isPositioned:function(){return Boolean(this.absolute||this.fixed||this.app)},styles:function(){var t=parseInt(this.height);return Object(v["a"])(Object(v["a"])({},x["a"].options.computed.styles.call(this)),{},{height:isNaN(t)?t:Object(C["f"])(t),left:Object(C["f"])(this.computedLeft),right:Object(C["f"])(this.computedRight),bottom:Object(C["f"])(this.computedBottom)})}},methods:{updateApplication:function(){var t=parseInt(this.height);return isNaN(t)?this.$el?this.$el.clientHeight:0:t}},render:function(t){var e=this.setBackgroundColor(this.color,{staticClass:"v-footer",class:this.classes,style:this.styles});return t(this.tag,e,this.$slots.default)}}),O=s("132d"),M=(s("0bc6"),s("7560")),w=Object(k["a"])(M["a"]).extend({name:"v-subheader",props:{inset:Boolean},render:function(t){return t("div",{staticClass:"v-subheader",class:Object(v["a"])({"v-subheader--inset":this.inset},this.themeClasses),attrs:this.$attrs,on:this.$listeners},this.$slots.default)}}),_=s("8654"),B=Object(c["a"])(l,a,i,!1,null,null,null);e["default"]=B.exports;d()(B,{VAvatar:f["a"],VBtn:p["a"],VCard:g["a"],VCardSubtitle:m["b"],VContainer:b["a"],VFooter:j,VIcon:O["a"],VSubheader:w,VTextField:_["a"]})},b5b6:function(t,e,s){}}]);
//# sourceMappingURL=chunk-7836384d.833eb923.js.map