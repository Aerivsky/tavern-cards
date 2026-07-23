<template>
  <div class="status-bar">
    <!-- 当前世界 -->
    <div class="world-row">
      <span class="label">所在</span>
      <span class="world-name">{{ store.stat_data.世界.当前所在小世界 || '—' }}</span>
      <span class="scene" v-if="store.stat_data.世界.当前场景">· {{ store.stat_data.世界.当前场景 }}</span>
    </div>

    <div class="divider"></div>

    <!-- 行商状态 -->
    <div class="section">
      <div class="section-title">行商</div>
      <div class="badges-row">
        <span class="badge" :class="stageClass">{{ store.stat_data.世界.行商阶段 }}</span>
        <span class="badge" :class="passClass">通行证·{{ store.stat_data.世界.通行证状态 }}</span>
      </div>
    </div>

    <div class="divider"></div>

    <!-- 藏锋状态 -->
    <div class="section">
      <div class="section-title">藏锋</div>
      <div class="badges-row">
        <span class="badge" :class="faceClass">面孔·{{ store.stat_data.藏锋.当前面孔 }}</span>
        <span class="badge" :class="qiyunClass">气运·{{ store.stat_data.藏锋.气运档位 }}</span>
      </div>
      <div class="kv-line" v-if="store.stat_data.藏锋.当前临时身份">
        <span class="kv-label">临时身份</span>
        <span class="kv-value">{{ store.stat_data.藏锋.当前临时身份 }}</span>
      </div>
      <div class="kv-line" v-if="store.stat_data.藏锋.当前着装">
        <span class="kv-label">着装</span>
        <span class="kv-value">{{ store.stat_data.藏锋.当前着装 }}</span>
      </div>
    </div>

    <!-- 世界足迹 -->
    <template v-if="footprintEntries.length">
      <div class="divider"></div>
      <div class="section">
        <div class="section-title">世界足迹</div>
        <div class="footprint-list">
          <div class="footprint-item" v-for="entry in footprintEntries" :key="entry.name">
            <span class="fp-name">{{ entry.name }}</span>
            <span class="fp-fame">{{ entry.fame }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from './store';
import { computed } from 'vue';

const store = useDataStore();

const stageClass = computed(() => {
  const s = store.stat_data.世界.行商阶段;
  if (s === '非法闯入') return 'badge-danger';
  if (s === '行商') return 'badge-safe';
  if (s === '离场') return 'badge-muted';
  return 'badge-info';
});

const passClass = computed(() => {
  const p = store.stat_data.世界.通行证状态;
  if (p === '合法') return 'badge-safe';
  if (p === '弱化') return 'badge-warn';
  if (p === '将尽') return 'badge-danger';
  return 'badge-muted';
});

const faceClass = computed(() => {
  const f = store.stat_data.藏锋.当前面孔;
  if (f === '对内') return 'badge-info';
  if (f === '独处') return 'badge-muted';
  return 'badge-accent';
});

const qiyunClass = computed(() => {
  const q = store.stat_data.藏锋.气运档位;
  if (q === '充足') return 'badge-safe';
  if (q === '紧张') return 'badge-warn';
  return 'badge-danger';
});

const footprintEntries = computed(() => {
  const data = store.stat_data.世界足迹 as Record<string, { 声望: string }>;
  if (!data) return [];
  return Object.entries(data).map(([name, val]) => ({
    name,
    fame: val?.声望 || '初来',
  }));
});
</script>

<style lang="scss" scoped>
.status-bar {
  width: 100%;
  max-width: 720px;
  background-color: var(--c-surface);
  border: 2px solid var(--c-accent);
  border-radius: 6px;
  font-family: var(--font-body);
  color: var(--c-text);
  font-size: 13px;
  line-height: 1.5;
  margin: 0 auto;
  padding: 10px 14px;
}

.world-row {
  display: flex;
  align-items: baseline;
  gap: 6px;

  .label {
    font-weight: 700;
    color: var(--c-accent-dark);
    min-width: 32px;
  }
  .world-name {
    color: var(--c-primary);
    font-weight: 700;
    font-size: 14px;
  }
  .scene {
    color: var(--c-text-muted);
    font-size: 12px;
  }
}

.divider {
  height: 1px;
  background: var(--c-border);
  margin: 8px 0;
}

.section {
  .section-title {
    font-weight: 700;
    font-size: 12px;
    color: var(--c-accent-dark);
    margin-bottom: 5px;
  }

  .badges-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 4px;
  }

  .badge {
    display: inline-block;
    padding: 2px 10px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
  }

  .badge-safe { background: var(--c-safe); }
  .badge-warn { background: var(--c-warn); }
  .badge-danger { background: var(--c-danger); }
  .badge-info { background: var(--c-info); }
  .badge-muted { background: var(--c-text-muted); }
  .badge-accent { background: var(--c-accent); }

  .kv-line {
    display: flex;
    gap: 6px;
    margin-top: 3px;

    .kv-label {
      min-width: 56px;
      color: var(--c-text-muted);
      font-size: 12px;
    }
    .kv-value {
      color: var(--c-text);
      font-size: 12px;
    }
  }
}

.footprint-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.footprint-item {
  display: flex;
  justify-content: space-between;
  font-size: 12px;

  .fp-name {
    color: var(--c-primary);
    font-weight: 600;
  }
  .fp-fame {
    color: var(--c-text-muted);
    font-style: italic;
  }
}
</style>
