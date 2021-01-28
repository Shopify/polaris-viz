<br/>
<br/>
<br/>
<br/>
<br/>
<a name="polaris-viz" href="#polaris-viz">
  <img height="73" src="../documentation/images/header/polaris-viz.png" alt="Polaris viz" />
</a><br/>
Polaris Viz is a data visualization React component library. It was built to help Shopify merchants better understand their data.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<a name="installation" href="#installation">
  <img height="36" src="../documentation/images/header/installation.png" alt="Installation" />
</a>

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install @shopify/polaris-viz --save
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command instead:

```bash
yarn add @shopify/polaris-viz
```

<br/>
<br/>
<br/>
<br/>
<a name="usage" href="#usage">
  <img height="36" src="../documentation/images/header/usage.png" alt="Usage" />
</a>

If your app is set up to consume `esnext` builds, import components where you want to use them and the styles will automatically be applied.

If your app is not set up for `esnext`, import the styles where you import components from the library:

```js
import '@shopify/polaris-viz/styles.css';
```

<br/>
<br/>
<br/>
<br/>
<a name="components" href="#components">
  <img height="36" src="../documentation/images/header/components.png" alt="Components" />
</a>

Chart components inherit their sizes from their containers, so place your chart components inside an element with a width and height specified.

<br/>

<table>
  <tr>
  <td>

<a href="../src/components/NormalizedStackedBarChart/NormalizedStackedBarChart.md">
  <img src="../src/components/NormalizedStackedBarChart/normalized-stacked-bar-chart.png"/>
</a>

#### Normalized stacked bar chart

Used for positive datasets with two to four items. [View documentation&nbsp;→](../src/components/NormalizedStackedBarChart/NormalizedStackedBarChart.md)

  </td>
  <td>

<a href="../src/components/Sparkline/Sparkline.md">
  <img src="../src/components/Sparkline/sparkline.png"/>
</a>

#### Sparkline

Used in small sizes to give an overview of how a metric has performed over time. [View documentation&nbsp;→](../src/components/Sparkline/Sparkline.md)

  </td>  
  </tr>
  
  <tr>
  <td>
<a href="../src/components/LineChart/LineChart.md">
  <img src="../src/components/LineChart/line-chart.png"/>
</a>

#### Line chart

Used to show change over time, comparisons, and trends. [View documentation&nbsp;→](../src/components/LineChart/LineChart.md)

  </td>
  <td>

<a href="../src/components/BarChart/BarChart.md">
  <img src="../src/components/BarChart/bar-chart.png"/>
</a>

#### Bar chart

Used to show comparison across categories. [View documentation&nbsp;→](../src/components/BarChart/BarChart.md)

  </td>  
  </tr>
  <tr>
  <td>
<a href="../src/components/MultiSeriesBarChart/MultiSeriesBarChart.md">
  <img src="../src/components/MultiSeriesBarChart/grouped-bar-example.png"/>
</a>

#### Multi-series grouped bar chart

Used to show a grouped comparison of different types, across categories. [View documentation&nbsp;→](../src/components/MultiSeriesBarChart/MultiSeriesBarChart.md)

  </td>

  <td>
<a href="../src/components/MultiSeriesBarChart/MultiSeriesBarChart.md">
  <img src="../src/components/MultiSeriesBarChart/stacked-bar-example.png"/>
</a>

#### Multi-series stacked bar chart

Used to show a stacked comparison of different types, across categories. [View documentation&nbsp;→](../src/components/MultiSeriesBarChart/MultiSeriesBarChart.md)

  </td>
  <tr>
  <td>
<a href="../src/components/StackedAreaChart/StackedAreaChart.md">
  <img src="../src/components/StackedAreaChart/stacked-area-chart.png"/>
</a>

#### Stacked area chart

Used to compare multiple series of data and display the total value. [View documentation&nbsp;→](../src/components/StackedAreaChart/StackedAreaChart.md)

  </td> 
  <td>
<a href="../src/components/TooltipContent/TooltipContent.md">
  <img src="../src/components/TooltipContent/tooltip-content.png"/>
</a>

#### Tooltip content

Used to format content in tooltips. [View documentation&nbsp;→](../src/components/TooltipContent/TooltipContent.md)

  </td>    
  </tr>  
</table>

<br/>
<br/>
<br/>
<br/>
<a name="contributing" href="#contributing">
  <img height="36" src="../documentation/images/header/contributing.png" alt="Contributing" />
</a>

Pull requests are welcome. See the <a href="/CONTRIBUTING.md">contribution guidelines</a> for more information.

<br/>
<br/>
<br/>
<br/>
<a name="licenses" href="#licenses">
  <img height="36" src="../documentation/images/header/licenses.png" alt="Licenses" />
</a>

- Source code is under a [custom license](https://github.com/Shopify/polaris-viz/blob/master/LICENSE.md) based on MIT. The license restricts Polaris Viz usage to applications that integrate or interoperate with Shopify software or services, with additional restrictions for external, stand-alone applications.
