<template>
  

     
          
<div id="app">
  <div class="top">
    <XhTop/>
    
  </div>
  
  <div class="content-after-top">
  <div class="leftt"></div>
    <div class="rightt">
    <div id="chatContainer">
      <h1 style="font-size: 40px;margin-bottom: 20px;">
        <svg t="1719665320929" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9694" width="48" height="48"><path d="M279.04 166.2976l303.104 251.904c2.048 0 8.192-2.048 16.384-12.288 20.48-24.576 71.68-96.256 110.592-151.552 2.048-2.048 2.048-4.096 4.096-6.144 8.192-18.432 22.528-65.536-14.336-108.544l-2.048-4.096s-28.672-47.104-75.776-55.296c-20.48-4.096-45.056 2.048-65.536 16.384-32.768 22.528-94.208 61.44-174.08 61.44h-2.048c-6.144 0-12.288 0-18.432-2.048-34.816-4.096-67.584 0-81.92 10.24m305.152 313.344c-16.384 0-30.72-6.144-36.864-12.288L227.84 203.1616C217.6 192.9216 211.456 180.6336 209.408 168.3456c0-14.336 6.144-24.576 14.336-32.768 34.816-47.104 112.64-43.008 143.36-38.912h14.336c61.44 0 110.592-30.72 135.168-47.104C551.424 24.9856 592.384 14.7456 631.296 20.8896c67.584 12.288 108.544 69.632 114.688 81.92 57.344 69.632 30.72 147.456 22.528 169.984-2.048 6.144-6.144 12.288-10.24 16.384-18.432 28.672-86.016 124.928-114.688 157.696-20.48 24.576-43.008 32.768-59.392 32.768" fill="#FF9918" p-id="9695"></path><path d="M141.312 980.992L81.92 970.752c28.672-153.6 108.544-260.096 178.176-325.632-8.192-2.048-16.384-2.048-24.576-4.096-43.008-12.288-75.776-43.008-98.304-88.064-77.824-163.84 131.072-348.16 139.264-356.352l40.96 45.056c-2.048 2.048-182.272 161.792-122.88 280.576 14.336 30.72 34.816 49.152 61.44 57.344 45.056 14.336 96.256-8.192 114.688-18.432 6.144-4.096 8.192-4.096 10.24-6.144l28.672 53.248-8.192 4.096c-38.912 24.576-215.04 137.216-260.096 368.64" fill="#FF9918" p-id="9696"></path><path d="M202.752 811.008l-36.864-49.152c8.192-6.144 198.656-149.504 395.264-153.6l2.048 61.44c-178.176 4.096-358.4 139.264-360.448 141.312" fill="#FF9918" p-id="9697"></path><path d="M692.224 991.232c-34.816-235.52-202.752-419.84-204.8-421.888l45.056-40.96c8.192 8.192 182.272 200.704 221.184 454.656l-61.44 8.192z" fill="#FF9918" p-id="9698"></path><path d="M903.168 817.152c-233.472-57.344-319.488-311.296-323.584-321.536l57.344-18.432-28.672 10.24 28.672-10.24c0 2.048 79.872 233.472 280.576 280.576l-14.336 59.392zM804.864 491.52c-114.688-102.4-202.752-22.528-204.8-18.432l-40.96-45.056c45.056-43.008 161.792-94.208 288.768 18.432L804.864 491.52zM751.616 987.136c0 16.384-14.336 30.72-30.72 30.72s-30.72-14.336-30.72-30.72 14.336-30.72 30.72-30.72 30.72 14.336 30.72 30.72" fill="#FF9918" p-id="9699"></path><path d="M942.08 786.3296c0 16.384-14.336 30.72-30.72 30.72S880.64 802.7136 880.64 786.3296 894.976 755.6096 911.36 755.6096s30.72 14.336 30.72 30.72" fill="#FF9918" p-id="9700"></path><path d="M638.976 485.376c0 16.384-14.336 30.72-30.72 30.72s-30.72-14.336-30.72-30.72 14.336-30.72 30.72-30.72 30.72 14.336 30.72 30.72M856.064 468.992c0 16.384-14.336 30.72-30.72 30.72s-30.72-14.336-30.72-30.72 14.336-30.72 30.72-30.72 30.72 12.288 30.72 30.72M538.624 548.864c0 16.384-14.336 30.72-30.72 30.72s-30.72-14.336-30.72-30.72 14.336-30.72 30.72-30.72 30.72 14.336 30.72 30.72M425.984 581.632c0 16.384-14.336 30.72-30.72 30.72s-30.72-14.336-30.72-30.72 14.336-30.72 30.72-30.72 30.72 14.336 30.72 30.72M143.36 974.848c0 16.384-14.336 30.72-30.72 30.72S81.92 993.28 81.92 974.848c0-16.384 14.336-30.72 30.72-30.72s30.72 14.336 30.72 30.72" fill="#FF9918" p-id="9701"></path></svg>
       <span style="
         font-family: '楷体', '宋体', sans-serif; 
  font-size: 40px; 
  color: #3F3F3F; 
  text-shadow: 1px 1px 0px #EAEAEA, 2px 2px 0px rgba(0, 0, 0, 0.1); 
  padding: 4px 12px; /* 添加一些内边距 */
  border-radius: 10px; 
 
  display: inline-block; 
  line-height: 1.2;

       ">语文老师</span> 
      </h1>
    
      <div id="chatLog">
        <div v-for="(message, index) in messages" :key="index" :class="message.type">
          <strong v-if="message.type === 'ai'">AI:</strong>
          <span>{{ message.content }}</span>
          <strong v-if="message.type === 'user'">你:</strong>
        </div>
      </div>
    </div>
    <div id="controlPanel">
      <input type="text" id="inputBox" v-model="input" placeholder="请输入你的问题" @keyup.enter="sendQuestion">
      <button @click="sendQuestion">发送</button>
      <button @click="clearChat">新建对话</button>
    </div>
    </div>
  </div>
  </div>
 


  
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'App',
  setup() {
    const input = ref('');
    const messages = ref([]);

    function sendQuestion() {
      if (!input.value.trim()) return;
      messages.value.push({ type: 'user', content: input.value });
      input.value = ''; // 清空输入框

      // 模拟AI回复
      setTimeout(() => {
        messages.value.push({ type: 'ai', content: '这是一个示例回答。' });
      }, 1000);
    }

    function clearChat() {
      messages.value = [];
    }

    return {
      input,
      messages,
      sendQuestion,
      clearChat
    };
  }
};
</script>

<style>
.top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* 确保顶部栏在内容之上 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ccc;
  h1{
    margin-top: 77px;
  }
}
.leftt{
  width: 300px;
  height: 950px;
 
  background: #f0f0f0;
}
/* 添加到<XhTop/>之后的元素的样式 */
.content-after-top {
  margin-top: 107px; /* 根据顶部栏的高度调整 */
  display: flex;
}
#chatLog {
  width: 1620px;
  padding: 10px;
  border: 1px solid #ccc;
  height: 800px; /* 设置固定高度 */
  overflow-y: auto; /* 当内容超过高度时显示滚动条 */
 
}

#chatLog div {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  max-width: 95%;
}

#chatLog div.user {
  justify-content: flex-end;
  margin-right: 10px; /* 增加用户消息的右边距 */
}

#chatLog div.ai {
  justify-content: flex-start;
}

#chatLog strong {
  margin-left: 10px;
}

#chatLog span {
  word-break: break-all; /* 确保长单词或长链接不会超出容器 */
}

#inputBox {
  width: 100%;
}

#controlPanel {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>