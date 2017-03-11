<template>
<div>
<el-tree
  :data="data2"
  :props="defaultProps"
  show-checkbox
  node-key="id"
  default-expand-all
  :expand-on-click-node="false"
  :render-content="renderContent">
</el-tree>
</div>
</template>
<script>
  let id = 1000;

  export default {
    data() {
      return {
        data2: [{
          id: 1,
          label: '板块 1',
          children: [{
            id: 4,
            label: '圈子 1-1',
          }]
        }, {
          id: 2,
          label: '板块 2',
          children: [{
            id: 5,
            label: '圈子 2-1'
          }, {
            id: 6,
            label: '圈子 2-2'
          }]
        }, {
          id: 3,
          label: '板块 3',
          children: [{
            id: 7,
            label: '圈子 3-1'
          }, {
            id: 8,
            label: '圈子 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },

    methods: {
      append(store, data) {
        store.append({ id: id++, label: 'testtest', children: [] }, data);
      },

      remove(store, data) {
        store.remove(data);
      },
      /**
       * 问题：1如何根据需要在子和父显示不同的按钮，例如子按钮不显示添加
       */

      renderContent(h, { node, data, store }) {
        return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="margin-left: 20px">
            <el-tag type="primary"	style="margin-right:5px">圈子数：10</el-tag>
            <el-tag type="success" style="margin-right:5px">今日发帖：10000</el-tag>
            <el-tag type="success" style="margin-right:5px">今日回帖：90000</el-tag>
            <el-tag type="warning" style="margin-right:5px">版主：阿彪</el-tag>
            </span>
            
            <span style="float: right; margin-right: 20px">
              <el-button size="mini" on-click={ () => this.append(store, data) }>添加</el-button>
              <el-button size="mini" on-click={ () => this.append(store, data) }>编辑</el-button>
              <el-button size="mini" on-click={ () => this.remove(store, data) }>删除</el-button>
            </span>
          </span>);
      }
    }
  };
</script>