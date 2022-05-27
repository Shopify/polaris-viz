import React, {useState} from 'react';
import {
  getColorVisionEventAttrs,
  getColorVisionStylesForActiveIndex,
} from '@shopify/polaris-viz-core';

// eslint-disable-next-line @shopify/strict-component-boundaries
import {ChartContainer} from '../../../components/ChartContainer';
import {useColorVisionEvents} from '../useColorVisionEvents';
import {useWatchColorVisionEvents} from '../useWatchColorVisionEvents';

import styles from './Playground.scss';

const items = ['red', 'green', 'blue'];

export function Playground() {
  // STEP 1: Make sure your chart is wrapped by <ChartContainer />.
  //
  //
  // Our custom event is triggered on the window so we want
  // to scope the events to each individual chart.
  //
  // To do this, useColorVisionEvents() uses the "id" from
  // ChartContext to scope the events to a single chart.
  //
  // Without the id, useColorVisionEvents() won't
  // find any elements to attach the mouse events to.
  return (
    <ChartContainer theme="Default">
      <Chart />
    </ChartContainer>
  );
}

export function Chart() {
  // STEP 2: Setup the mouse events for this component.
  //
  // useColorVisionEvents() will attach mouse events
  // to each item that has used getColorVisionEventAttrs().
  //
  // This applies to all children of this component, so this hook
  // only needs to be called once at the chart level.
  useColorVisionEvents();

  const [activeIndex, setActiveIndex] = useState(-1);

  // STEP 3: Tell the component you want to start listening
  // to the custom events.
  //
  // We can watch for our custom event by using
  // useWatchColorVisionEvents(). The type property
  // tells the hook which events to watch for and then
  // runs the onIndexChange() callback each time the event
  // is triggered.
  useWatchColorVisionEvents({
    type: 'single',
    onIndexChange: (event: CustomEvent) => {
      const {index} = event.detail;

      // Will be a valid index when an item is hovered, and
      // -1 when there is no item currently hovered.
      setActiveIndex(index);
    },
  });

  // We can watch for multiple events too.
  useWatchColorVisionEvents({
    type: 'group',
    onIndexChange: () => {
      // Set the green box as the active item when
      // a "group" mouse-enter event comes in, but don't
      // reset it on mouse-out
      setActiveIndex(1);
    },
  });

  return (
    <React.Fragment>
      <h2>Trigger and respond to events</h2>
      <div className={styles.Boxes}>
        {items.map((color, index) => {
          return (
            <div
              key={index}
              // STEP 4: Attach data-attributes to an item that useColorVisionEvents()
              // will use to attach mouse events to.
              //
              // This element will have mouse events attached to it
              // and will fire events for the 'single' type.
              // Any components listening for this event will react
              // when this element is hovered.
              {...getColorVisionEventAttrs({type: 'single', index})}
              className={styles.Box}
              style={{
                background: color,
                // STEP 5: Respond to index/state changes.
                //
                // Fade in/out elements based on the current activeIndex.
                // This takes care of applying opacity and the fade transition.
                ...getColorVisionStylesForActiveIndex({activeIndex, index}),
              }}
            />
          );
        })}
        <GroupItem />
      </div>

      <h2>Only respond to events</h2>

      <div className={styles.Texts}>
        {items.map((color, index) => {
          return (
            <p
              key={index}
              style={{
                // These elements only react to changes, they
                // don't trigger any events.
                //
                // Because we're only reacting to state changes,
                // we can use the activeIndex to do anything.
                fontSize: activeIndex === index ? 15 : 12,
              }}
            >
              {color}
            </p>
          );
        })}
      </div>

      <h2>Only trigger events</h2>

      <Buttons />
    </React.Fragment>
  );
}

function GroupItem() {
  return (
    <div
      key={4}
      className={styles.Box}
      style={{
        background: 'grey',
      }}
      {...getColorVisionEventAttrs({type: 'group', index: 4})}
    />
  );
}

function Buttons() {
  // It doesn't matter where the elements are in the
  // tree, they will still trigger an event when
  // interacted with.
  //
  // Same goes for listening for events, you can listen
  // to any type of event regardless of depth.
  useWatchColorVisionEvents({
    type: 'group',
    onIndexChange: (event: CustomEvent) => {
      // eslint-disable-next-line no-console
      console.log('group type triggered', event.detail);
    },
  });

  return (
    <div className={styles.Buttons}>
      {items.map((color, index) => {
        return (
          <button
            key={index}
            {...getColorVisionEventAttrs({type: 'single', index})}
            className={styles.Button}
          >
            Trigger: {color}
          </button>
        );
      })}
    </div>
  );
}
