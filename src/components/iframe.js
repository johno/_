import { h } from 'preact'

export const Iframe = ({ src, title = "", ...props }) => (
  <iframe title={title} src={src} />
);
