Analytics experiences across Shopify will use a consistent design language. The language’s theme, color palette, and animations all support delightful and meaningful analytics experiences.

<br/>
<br/>

### Dark and Light Themes

Two distinct themes—a dark and a light—have been developed for analytics experiences in the Shopify admin. Determining which theme and color palette to use depends on the type of experience being built, and the surface and context in which it will appear.

Use of the dark theme is the most effective way to visually distinguish between operational and analytical elements that may exist within a page. For example, it is often ideal when building in-context dashboards on operational pages (e.g. Orders page dashboard).

Additionally, the dark theme:

- Provides visual clarity when exploring visualizations over long periods of time with less strain to the eyes.
- Allows merchants to scan through visualizations without getting too fixated on labels and other supporting text.

Use of the light theme is best used in spaces where there isn’t a need to visually distinguish the analytics content from its surroundings, as it aligns with the dominant light theme of the Shopify admin. For example, the Finances overview uses a light theme as the entire page contains data-related content.

<br/>
***

### Color palettes

The defined color palettes make analytics experiences aesthetically pleasing, but also add a layer of meaning to the data. Each color, and its specific usage, communicates something in the data, such as progress, or highlighting peak or low values.

Chart gradients have been incorporated in order to reinforce the communication of peaks and negative values in the data. There are two key elements to chart gradients, each with distinct meaning:

- The base gradient goes from a default purple for lower values to a blue hue for higher values.
- The overlay gradient can be either green for positive scenarios or red for negative scenarios and is used to highlight the peak values of the chart.

#### Single series gradients

<img src='dark-single-series-gradients.png' alt="Dark theme single series gradients" />

<img src='light-single-series-gradients.png' alt="Light theme single series gradients" />

#### Neutral

A neutral gradient is best used when we are not adding a positive or negative interpretation to the chart with the colors used.

For example, the chart below displays a distribution of fulfillment times for orders. In this case, we’re showing a neutral gradient because it’s hard to judge whether this distribution is good or bad. It might be perfectly normal for certain types of orders to have long fulfillment times, so we don’t want to draw attention to them unnecessarily.

<img src='neutral-example.png' alt="Vertical bar chart showing fulfillment time" />

#### Positive
A positive gradient is best used to demonstrate where data has a positive impact on the business. This gradient highlights the points in the datasets where the values are most desirable.

In these two examples, the charts show the number of ordered items (bar chart) and their pattern over time (line chart). The higher the number of ordered items, the higher the business’s revenue, so the positive impact is highlighted by the green end of the gradient.

<img src='positive-example.png' alt="Bar and Line Charts showing positive impact" />

#### Negative
A negative gradient is best used to demonstrate that the data has a negative impact on the business. This gradient highlights the points in the datasets where the values are least desirable.

In these two examples, the charts show the number of returned items (bar chart) and their trend over time (line chart). Greater numbers of returned items are not good for the business, so the negative impact is highlighted by the red end of the gradient.

<img src='negative-example.png' alt="Bar and Line Charts showing negative impact" />

<br/>
***

### Multi series gradients

There may be situations where multiple series need to be used at the same time. For any of the multi-series gradients, you should follow the sequence of colors (from left to right) as defined for each of the sizes. For example, in the four-color gradient, start with indigo and end with teal.

#### Multi series up to 4 colors

##### Dark theme

<img src='dark-multiseries-up-to-4.png' alt="4 color gradient" />

##### Light theme

<img src='light-multiseries-up-to-4.png' alt="4 color gradient" />


#### Multi series up to 7 colors

##### Dark theme

<img src='dark-multiseries-up-to-7.png' alt="7 color gradient" />

##### Light theme

<img src='light-multiseries-up-to-7.png' alt="7 color gradient" />


#### Multi series up to 14 colors

##### Dark theme

<img src='dark-multiseries-up-to-14.png' alt="14 color gradient" />

###### Light theme

<img src='light-multiseries-up-to-14.png' alt="14 color gradient" />

#### Solid colors

##### Dark theme

<img src='dark-solid-colors.png' alt="Solid colors for dark theme" />

##### Light theme

<img src='light-solid-colors.png' alt="Solid colors for light theme" />

<br/>

### Comparison to past
A solid gray color is used when the data set is being compared to past values. For example, when comparing total sales by month for this year to last year, the current data will be shown as a gradient, and the past values will be gray.

### Trend Indicator
Solid green and red colors are used in indicators to communicate data changes in a negative or positive light. A neutral light grey color is used when there has been no change compared to the previous period. For example, a positive change relative to a reference value will be shown with a green indicator arrow and green value, while no change will be shown as a grey dash (-).
