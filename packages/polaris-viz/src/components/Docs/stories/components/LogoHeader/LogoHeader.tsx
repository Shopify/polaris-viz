// eslint-disable-next-line @shopify/images-no-direct-imports
import PolarisVizLogo from './images/polarisviz-logo.svg';
import styles from './LogoHeader.scss';

export function LogoHeader() {
  const alt = 'Polaris Viz logo';
  return (
    <div className={styles.Container}>
      <img className={styles.ChartLogo} src={PolarisVizLogo} alt={alt} />
    </div>
  );
}
