The analytics system includes several building blocks for analytics experiences. Each building block has its own guidance for design, use, and implementation, and some include reusable components. The system currently includes several building blocks (widgets, charts, data tables), but will grow and evolve as more use cases and user needs are explored.


### Widgets

A ShopifyQL query and its visual output that may contain a title, short description, a chart, a trend, and other functionalities. A widget is always powered by a ShopifyQL query and can be published to appear on index and overview pages, reports and dashboards. Widgets should always link to a corresponding report and be powered by a ShopifyQL query.

<img src='system-diagram.png' alt="ShopifyQL diagram" />

<br/>

##### Complexity

Widgets can be of varying complexities based on the queries that generated them. They also differ in interactivity and behaviour, as well as where they are published.

##### Content

A widget can include some or all of the following elements:

<img src='widgets-structure.png' alt="A widget displaying total sales" />

- **Title** \- the name of the metric being displayed in the widget
- **Value** \- the numeric value that communicates the metric
- **Trend indicator** \- an arrow and value indicating whether the metric has increased or decreased compared to the previous time period
- **Timestamp** \- the window of time widget’s data is from (when there’s no other indication of time present)
- **Chart** \- a visual representation of the metric being displayed (e.g. sparkline)
- **Dimension** \- a concept used to slice the main metric in a specific way, for example, total sales by sales channel


##### Types

There are two main tiers of widgets that have been defined in the analytics system. Level 1 (L1) is the simplest in complexity, both in terms of the information contained in the widget, and in how it’s displayed. Level 1 widgets have limited interactivity.

A level 1 widget can be as simple as only a title and a fact, or as complex as a title, fact, one low-cardinality dimension, change indicator, and simple chart.

<img src='widgets-simple-complex.png' alt="Level 1 widget displaying total sales" />

Level 2 (L2) is the most complex type of widget, both in terms of the data it displays and how it’s displayed, both visually and including their more complex functionalities and interactions.

<img src='L2-line-chart-sales.png' alt="Line Chart displaying total sales" />

A chart, or visualization, is the representation of data in a visual form, typically presented in the form of a chart or a table. Different metrics and analytics experiences require varying visualizations, so we provide a range of charts to ensure the best visualization for every situation.

***

### Sparklines and sparkbars

Metrics that show time-series data include a sparkline or sparkbar to visually highlight the data trend.

<img src='oic-widgets.png' alt="A dashboard displaying the most relevant metrics for a merchant" />

**Sparklines** are most often used to communicate progress toward a cumulative number, but can also be used to show change over time. For example, a sparkline would work well to show total sales growth over the course of a day.

**Sparkbars** are best used to indicate non-cumulative values at specific points in time, where the merchant is more interested in seeing the metric at regular intervals. For example, a sparkbar would work well to show how many online store sessions a merchant’s website got during each day of the month.

***

### Line chart | Time series

<img src='L2-line-chart-orders.png' alt="Line Chart displaying order over time" />

The line chart is best used to display discrete data: a series of data points over time, where the time intervals are uniform and equally spaced (e.g. one data point per hour). It shows how the data is trending over time.

Best for:

- Showing discrete data, like sales or orders, over regular time intervals
- Seeing data changes, like growing sales, over time

***

### Vertical bars | Categorical

<img src='bar-chart-categorical.png' alt="Vertical bar chart displaying ordered items" />

The vertical bar chart is best used to present categorical data, which is data that can be put into groups. For example, you could group data by product, geographical location, or sales channel.

Categorical data is best for communicating discrete values for each grouping, like showing the total number of each product that has been ordered in the example above. Other common examples of categorical data are age, education level, and language.

***

### Vertical bars | Distribution

<img src='bar-chart-distribution.png' alt="Vertical bar chart displaying fulfillment time" />

The distribution vertical bar chart’s goal is to approximate the distribution of a metric, and is best used to demonstrate the spread of a metric’s values, making it easy to see outliers, gaps, or areas of concentration. For example, this chart shows the distribution of the merchant’s fulfillment times, and highlights the median time to fulfill their orders.

***

### Data tables

Data displayed in a tabular form through rows and columns. For example, the web traffic of an online store displayed in the data table below. Data tables are most often seen in notebooks and reports.

<img src='data-table-example-reports.png' alt="Table displaying orders" />
