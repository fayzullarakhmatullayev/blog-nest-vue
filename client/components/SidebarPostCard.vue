<template>
  <div class="sidebar-post">
    <NuxtLink to="/1" class="sidebar-post--thumbnail">
      <img src="https://via.placeholder.com/300" alt="Post Thumbnail" />
    </NuxtLink>
    <div class="sidebar-post--content">
      <NuxtLink class="sidebar-post--title" to="/1">
        Post title Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, facilis.
      </NuxtLink>
      <p class="sidebar-post--short-content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit necessitatibus at, suscipit
        labore voluptatem explicabo, perferendis harum earum totam commodi modi laborum excepturi,
        distinctio impedit quod laboriosam! Ad, eveniet dolor.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
@mixin customLineClamp($lineClampValue) {
  display: -webkit-box;
  -webkit-line-clamp: $lineClampValue;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
}
.sidebar-post {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-radius: 5px;
  border: var(--card-border);
  background-color: var(--color-white);

  &--thumbnail {
    width: 100%;
    height: 200px;
    border-radius: 5px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &--content {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &--title {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-blue);
    text-decoration: none;
    @include customLineClamp(2);

    &:hover {
      text-decoration: underline;
    }
  }

  &--short-content {
    font-size: 14px;
    margin: 0;
    color: var(--color-charcoal);
    @include customLineClamp(3);
  }
}
</style>
