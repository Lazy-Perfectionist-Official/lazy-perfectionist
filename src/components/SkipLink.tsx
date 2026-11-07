// The first thing in the tab order on every screen. The bellyband, the
// wordmark and the nav all sit between the top of the page and the content,
// so keyboard and screen-reader readers get told once, up front, that they
// can step past them. Hidden until focused — see .skip-link.
export default function SkipLink() {
  return (
    <a href="#main" className="skip-link">
      Skip to content
    </a>
  );
}
