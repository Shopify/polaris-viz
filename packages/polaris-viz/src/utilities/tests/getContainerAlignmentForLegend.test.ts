import {getContainerAlignmentForLegend} from '../getContainerAlignmentForLegend';

describe('getContainerAlignmentForLegend', () => {
  describe('centered alignments', () => {
    it('returns an object with alignItems: "center" when "top", "bottom", "right", or "left" are passed', () => {
      expect(getContainerAlignmentForLegend('top')).toHaveProperty(
        'alignItems',
        'center',
      );
      expect(getContainerAlignmentForLegend('bottom')).toHaveProperty(
        'alignItems',
        'center',
      );
      expect(getContainerAlignmentForLegend('right')).toHaveProperty(
        'alignItems',
        'center',
      );
      expect(getContainerAlignmentForLegend('left')).toHaveProperty(
        'alignItems',
        'center',
      );
    });

    it('returns an object with flexDirection: "column-reverse" when "top" is passed', () => {
      expect(getContainerAlignmentForLegend('top')).toHaveProperty(
        'flexDirection',
        'column-reverse',
      );
    });

    it('returns an object with flexDirection: "column" when "bottom" is passed', () => {
      expect(getContainerAlignmentForLegend('bottom')).toHaveProperty(
        'flexDirection',
        'column',
      );
    });

    it('returns an object with flexDirection: "row" when "right" is passed', () => {
      expect(getContainerAlignmentForLegend('right')).toHaveProperty(
        'flexDirection',
        'row',
      );
    });

    it('returns an object with flexDirection: "row-reverse" when "left" is passed', () => {
      expect(getContainerAlignmentForLegend('left')).toHaveProperty(
        'flexDirection',
        'row-reverse',
      );
    });
  });

  describe('corner alignments', () => {
    it('returns an object with flexDirection: "row-reverse" when "top-left" or "bottom-left" are passed', () => {
      expect(getContainerAlignmentForLegend('top-left')).toHaveProperty(
        'flexDirection',
        'row-reverse',
      );
      expect(getContainerAlignmentForLegend('bottom-left')).toHaveProperty(
        'flexDirection',
        'row-reverse',
      );
    });

    it('returns an object with flexDirection: "row" when "top-right" or "bottom-right" are passed', () => {
      expect(getContainerAlignmentForLegend('top-right')).toHaveProperty(
        'flexDirection',
        'row',
      );
      expect(getContainerAlignmentForLegend('bottom-right')).toHaveProperty(
        'flexDirection',
        'row',
      );
    });

    it('returns an object with alignItems: "start" when "top-left" or "top-right" are passed', () => {
      expect(getContainerAlignmentForLegend('top-left')).toHaveProperty(
        'alignItems',
        'start',
      );
      expect(getContainerAlignmentForLegend('top-right')).toHaveProperty(
        'alignItems',
        'start',
      );
    });

    it('returns an object with alignItems: "end" when "bottom-left" or "bottom-right" are passed', () => {
      expect(getContainerAlignmentForLegend('bottom-left')).toHaveProperty(
        'alignItems',
        'end',
      );
      expect(getContainerAlignmentForLegend('bottom-right')).toHaveProperty(
        'alignItems',
        'end',
      );
    });
  });

  describe('alignment within column', () => {
    it('returns an object with flexDirection: "column-reverse" when "top-left-column" or "top-right-column" are passed', () => {
      expect(getContainerAlignmentForLegend('top-left-column')).toHaveProperty(
        'flexDirection',
        'column-reverse',
      );
      expect(getContainerAlignmentForLegend('top-right-column')).toHaveProperty(
        'flexDirection',
        'column-reverse',
      );
    });

    it('returns an object with flexDirection: "column" when "bottom-left-column" or "bottom-right-column" are passed', () => {
      expect(
        getContainerAlignmentForLegend('bottom-left-column'),
      ).toHaveProperty('flexDirection', 'column');
      expect(
        getContainerAlignmentForLegend('bottom-right-column'),
      ).toHaveProperty('flexDirection', 'column');
    });

    it('returns an object with alignItems: "start" when "top-left-column" or "bottom-left-column" are passed', () => {
      expect(getContainerAlignmentForLegend('top-left-column')).toHaveProperty(
        'alignItems',
        'start',
      );
      expect(
        getContainerAlignmentForLegend('bottom-left-column'),
      ).toHaveProperty('alignItems', 'start');
    });

    it('returns an object with alignItems: "end" when "top-right-column" or "bottom-right-column" are passed', () => {
      expect(getContainerAlignmentForLegend('top-right-column')).toHaveProperty(
        'alignItems',
        'end',
      );
      expect(
        getContainerAlignmentForLegend('bottom-right-column'),
      ).toHaveProperty('alignItems', 'end');
    });
  });
});
