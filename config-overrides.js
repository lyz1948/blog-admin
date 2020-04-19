const { override, fixBabelImports, addLessLoader } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#17a2b8',
      '@text-color': '#a6bed8',
      'border-color-base': '#303f50',
      '@table-bg': '#2d3a4c',
      '@input-bg': '#4d5b69',
      '@input-border-color': '#4d5b69',
      '@table-header-bg': '#283647',
      '@table-row-hover-bg': '#283647',
      '@table-header-color': '#a6c3dc',
      '@table-selected-row-color': '#a6c3dc',
      '@table-selected-row-bg': '#283647',
      '@table-body-sort-bg': '#283647',
      '@table-body-selected-sort-bg': '#283647',
      '@table-selected-row-hover-bg': '#283647',
      '@border-color-split': 'rgba(0, 0, 0, .5)',
    },
  }),
)
