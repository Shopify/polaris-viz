import type {AnnotationLookupTable} from 'types';

export function checkAvailableAnnotations(
  annotationsLookupTable: AnnotationLookupTable,
) {
  const values = Object.values(annotationsLookupTable);

  return {
    hasXAxisAnnotations: values.some(({axis}) => axis === 'x'),
    hasYAxisAnnotations: values.some(({axis}) => axis.includes('y')),
  };
}
