<script lang="ts" setup>
import { ref, computed, onMounted, inject } from "vue";
import { useStore } from "vuex";
import { userInjectionKey } from "@/Injectionkeys";
const store = useStore();
const user = inject(userInjectionKey);

//variables
const body = ref("");
const maxCount = ref(30);

const textArea = ref<HTMLTextAreaElement | null>(null);
onMounted(() => textArea.value?.focus());

//computed
const charCount = computed<number>(() => {
  return body.value.length;
});

//functions
const handleTextInput = (e: Event) => {
  const textArea = e.target as HTMLTextAreaElement;
  if (textArea.value.length <= maxCount.value) {
    body.value = textArea.value;
  } else {
    body.value = textArea.value.substring(0, maxCount.value);
    textArea.value = textArea.value.substring(0, maxCount.value);
  }
};
const handleSubmitEntry = () => {
  const entry = {
    body: body.value,
    id: Math.random(),
    createdAt: new Date(),
    isChecked: false,
  };
  if (body.value.length > 0) {
    store.dispatch("addTodo", entry);
    body.value = "";
  } else {
    let snackbar = document.getElementById("snackbar") as HTMLDivElement | null;
    if (snackbar != null) {
      snackbar.className = "show";
    }
    setTimeout(function () {
      if (snackbar != null) {
        snackbar.className = snackbar.className.replace("show", "");
      }
    }, 3000);
  }
};
</script>
<template>
  <div id="snackbar">Please put in a valid todo Input..</div>
  <form class="entry-form w-full" @submit.prevent="handleSubmitEntry">
    <div class="w-full col-span-8 md:col-span-9">
      <input
        :value="body"
        ref="textArea"
        @keyup="handleTextInput"
        :placeholder="`A new todo item for ${user?.name}`"
      />
      <span>{{ charCount }} / {{ maxCount }}</span>
    </div>
    <div class="flex w-full justify-end md:ml-6 h-12 md:col-span-3 col-span-4">
      <button class="text-sm flex items-center">Add Item</button>
    </div>
    <!-- </div> -->
  </form>
</template>
<style>
#snackbar {
  visibility: hidden;
  /* Hidden by default. Visible on click */
  min-width: 250px;
  /* Set a default minimum width */
  margin-left: -125px;
  /* Divide value of min-width by 2 */
  background-color: #333;
  /* Black background color */
  color: #fff;
  /* White text color */
  text-align: center;
  /* Centered text */
  border-radius: 2px;
  /* Rounded borders */
  padding: 16px;
  /* Padding */
  position: fixed;
  /* Sit on top of the screen */
  z-index: 1;
  /* Add a z-index if needed */
  left: 50%;
  /* Center the snackbar */
  bottom: 30px;
  /* 30px from the bottom */
}

/* Show the snackbar when clicking on a button (class added with JavaScript) */
#snackbar.show {
  visibility: visible;
  /* Show the snackbar */
  /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
  However, delay the fade out process for 2.5 seconds */
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }

  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }

  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }

  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }

  to {
    bottom: 0;
    opacity: 0;
  }
}
</style>
