All analytics experiences across Shopify are powered by ShopifyQL. Different analytics experiences serve different merchant needs. In-context analytics support monitoring by bringing simple metrics into the operational spaces where merchants do day-to-day tasks. Reports present a more comprehensive view, and support merchants being able to further investigate their data. Notebooks enable the deepest level of data exploration and analysis and are where a merchant can modify an existing ShopifyQL query, or create their own.

<br/>

### ShopifyQL

The querying language built specifically for communication between systems serving data and systems querying data, inside and outside of Shopify. A request for data, formatted using ShopifyQL, is called a query or code snippet.

Most queries are created by Shopify to power the metrics and analytics experiences that appear across the admin. Some queries can be merchant-generated from within notebooks.

The following is an example of a ShopifyQL query. This query is requesting the metric `total_sales` from the sales data table and asking that it’s displayed by day, over the past 30 days. The requested data can then be displayed in a variety of forms, such as a data table or a chart.

```tsx
FROM sales
SHOW total_sales
BY month OVER day
SINCE -30d UNTIL today

```

### In-context analytics experiences

Surface metrics within the operational spaces of the admin (e.g. Orders, Products, Customers). They should include only the most relevant metrics for the operational workflows that merchants do in those spaces and should help merchants more efficiently make data-informed decisions while doing day-to-day tasks.

<img src='oic-widgets.png' alt="A dashboard displaying the most relevant metrics for a merchant" />

### Report experiences

More comprehensive representations of a data set that typically include a data visualization (chart) and data table. The information contained in a report can be somewhat modified, for example adding a filter, but to make significant changes the merchant must edit the underlying query in a notebook.

Reports are accessed through the Analytics section, but in-context metrics also directly connect to relevant reports, so merchants can more deeply explore and analyze their data when necessary.

<img src='report-viz.png' alt="Line chart displaying orders over time" />


### Notebook experiences

Allow a merchant to create or modify existing ShopifyQL queries. Notebooks are an exploratory tool that can generate a visualization or a data table, using ShopifyQL. In a notebook, the merchant can edit an existing query from a Shopify-generated report or create a new query entirely.
