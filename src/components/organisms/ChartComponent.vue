<script setup lang="ts">
import '@/assets/css/organisms/chart.css'
import chartOptions from '@/assets/ts/chartOptions'
import PopulationTypes from '@/components/molecules/PopulationTypes.vue'
import VueHighcharts from 'vue3-highcharts'
import {
    TransferPrefInfo,
    PrefInfo,
    PrefCharts,
} from '@/assets/ts/interfaces/interfaces'
import { ref, toRefs, watch, nextTick } from 'vue'

interface Props {
    transferPrefInfo: TransferPrefInfo | undefined
}
const props = defineProps<Props>()

// 表示する人口の種別
const populationType = ref<number>(0)
const populationName = ref<string>('総人口')

// 人口種別のラジオボタンが変更された際、グラフとタイトルの表示を変更
const setPopulationType = (selectedPopulationType: {
    [key: string]: string
}): void => {
    populationType.value = parseInt(selectedPopulationType.type)
    populationName.value = selectedPopulationType.name
}

// グラフ描画用の人口情報を生成
const generatePrefCharts = (pref: PrefInfo, type: number): PrefCharts => {
    const populationList = pref.population[type].data.map((v) => v.value)

    return {
        name: pref.prefName,
        data: populationList,
    }
}

// チャートを強制更新する
const renderComponent = ref<boolean>(true)
const forceRenderer = async () => {
    renderComponent.value = false
    await nextTick()
    renderComponent.value = true
}

// 都道府県人口情報
const { transferPrefInfo } = toRefs(props)
const prefInfo = ref<PrefInfo[]>([])

// 人口種別が変更された際既存のオプションをリセットして変更された種別の内容に変更
watch(populationType, () => {
    chartOptions.series = []
    chartOptions.series = prefInfo.value.map((pref) =>
        generatePrefCharts(pref, populationType.value)
    )
    forceRenderer()
})

// 都道府県情報の追加・削除が伝達された場合チャートオプションを更新
watch(transferPrefInfo, () => {
    const transfer = transferPrefInfo.value
    if (transfer !== undefined) {
        if (transfer.method === 'remove') {
            prefInfo.value.splice(transfer.index, 1)
            chartOptions.series.splice(transfer.index, 1)
        } else if (
            transfer.method === 'push' &&
            transfer.prefInfo !== undefined
        ) {
            prefInfo.value.splice(transfer.index, 0, transfer.prefInfo)
            chartOptions.series.splice(
                transfer.index,
                0,
                generatePrefCharts(transfer.prefInfo, populationType.value)
            )
        }

        forceRenderer()
    }
})
</script>
<template>
    <section class="chart-area">
        <h2>選択した都道府県の{{ populationName }}統計</h2>
        <PopulationTypes @setPopulationType="setPopulationType" />
        <div
            class="chart-detail"
            v-if="chartOptions.series.length > 0 && renderComponent"
        >
            <VueHighcharts class="chart" type="chart" :options="chartOptions" />
            <small class="caption">※2020年以降は推計値</small>
        </div>
        <div v-else class="not-selected">
            <p>都道府県が選択されていません。</p>
        </div>
    </section>
</template>
