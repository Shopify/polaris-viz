The animations that a user sees when interacting with their data help communicate the passage of time, draw attention to specific elements on the screen, and ultimately help the user understand the information displayed. Behavior elements must never get in the way of users getting the context they need.

### Hover state and contrast

When the user interacts with a bar chart, the information the user is hovering over is highlighted, while lowering the opacity on all other data-ink. This reduces the visual contrast of anything that the user is not actively interacting with, lowering the noise and highlighting what’s important to them at that moment.

<img src='analytics-in-context-hover-and-contrast.gif' alt="Animation of hovering over the bar chart" />

When interacting with a line chart, a dot will appear on the line(s) for the data point(s) closest to the mouse. When moving the mouse around the chart, the dots animate, following the path of each line until they snap into the next position on top of a data point. This helps guide the eye in tandem with the user’s intent, and differentiate parts of the line that actually have data points from parts that are just interpolations between one data point and the next.

<img src='analytics-in-context-linechart.gif' alt="Animation of hovering over the line chart" />

### Empty/Loading state

When a vertical  chart first appears on the screen, the initial animation starts from zero on the y-axis. The shape that represent the data, for example bars of lines, then grow from the zero line to their final position

<img src='barchart_loading.gif' alt="Bar chart animation" />

