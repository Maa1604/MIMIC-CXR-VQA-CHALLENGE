import "./Assessment.css";

function Assessment() {
  return (
    <div className="assessment-page">
      <div className="assessment-content">
        <h2>Assessment Criteria</h2>

        <h3>Metrics</h3>

        <p>
          For each scan, the submitted method is tasked to output two types of
          transformation-representing displacement vectors (hereinafter also
          referred to as the prediction), at global and local levels.
        </p>

        <ul>
          <li>
            The <strong>global displacement vectors</strong> will be used to
            reconstruct individual frames (without the first frame), with
            respect to the first frame in the scan as the{" "}
            <em>global reference frame</em>.
          </li>
          <li>
            The <strong>local displacement vectors</strong> will be used to
            reconstruct individual frames (without the first frame), with
            respect to the immediately previous frame in the scan as the{" "}
            <em>local reference frame</em>.
          </li>
        </ul>

        <p>
          For each scan, the performance of a submitted method will be evaluated
          using two reconstruction errors:{" "}
          <em>landmark reconstruction error</em> and{" "}
          <em>pixel reconstruction error</em>.
        </p>

        <ul>
          <li>
            The <strong>landmark reconstruction error</strong> is defined as the
            average Euclidean distance between the ground-truth-reconstructed
            frame and the prediction-reconstructed frame, averaged over a set of
            predefined anatomical landmarks in each scan.
          </li>
          <li>
            The <strong>pixel reconstruction error</strong> is defined as the
            same average Euclidean distance, averaged over all pixels of all but
            the first frame in each scan.
          </li>
        </ul>

        <p>
          Thus, each submitted method should output four sets of displacement
          vectors:
        </p>

        <ul>
          <li>
            Global displacement vectors for pixel reconstruction (GP vectors)
          </li>
          <li>
            Global displacement vectors for landmark reconstruction (GL vectors)
          </li>
          <li>
            Local displacement vectors for pixel reconstruction (LP vectors)
          </li>
          <li>
            Local displacement vectors for landmark reconstruction (LL vectors)
          </li>
        </ul>

        <p>
          Based on these four output vector sets, four evaluation metrics will be
          used in this challenge:
        </p>

        <ul>
          <li>Global pixel reconstruction error (GPE)</li>
          <li>Global landmark reconstruction error (GLE)</li>
          <li>Local pixel reconstruction error (LPE)</li>
          <li>Local landmark reconstruction error (LLE)</li>
        </ul>

        <div className="note">
          <strong>NOTE:</strong> Runtime will be considered as an additional
          evaluation metric, defined as the consumed time of predicting
          positions for all frames in a scan, averaged over all scans in the
          test set.
        </div>

        <h3>Rationale in using these metrics</h3>

        <h4>
          Rationale in using Euclidean distance-based error metrics, as opposed
          to errors defined in transformation parameter space
        </h4>

        <p>
          Directly measuring the accuracy of parameters of a transformation
          matrix is difficult since the contribution and weighting between
          rotation and translation components can be sensitive to experimental
          and imaging configurations. In this challenge, distance-based metrics
          are preferred as a more practical measure reflecting the difference
          between ground truth and prediction in Euclidean space (Luo et al.
          2023).
        </p>

        <h4>
          Justification of using displacement-based representation of
          transformation
        </h4>

        <p>
          Although the ground truth is available in the form of rigid
          transformation, enforcing homogeneous transformation outputs is not
          necessary and may encourage numerically challenging solutions. The
          displacement-based representation allows greater flexibility and
          quantitative accuracy (Li et al. 2024), while remaining sufficient
          for clinical use.
        </p>

        <h4>Justification of the local and global reconstruction errors</h4>

        <p>
          Reconstructions from local and global displacement levels represent
          different reconstruction behaviors, such as frame-level error and
          accumulated drift (Li et al. 2023; Wein et al. 2020). These two error
          types capture accuracy across different reconstruction lengths
          without enforcing a single clinical application.
        </p>

        <h3>Ranking method</h3>

        <p>
          The ranking follows the <em>aggregate then rank</em> strategy proposed
          by Maier-Hein et al. 2018.
        </p>

        <p>
          For each test scan, the four evaluation metrics will be normalised
          using the smallest and largest reconstruction errors:
        </p>

        <div className="formula-block">
          <p>GPE* = (GPE − largest_GPE) / (smallest_GPE − largest_GPE)</p>
          <p>GLE* = (GLE − largest_GLE) / (smallest_GLE − largest_GLE)</p>
          <p>LPE* = (LPE − largest_LPE) / (smallest_LPE − largest_LPE)</p>
          <p>LLE* = (LLE − largest_LLE) / (smallest_LLE − largest_LLE)</p>
        </div>

        <p>
          The final score for each scan is computed as:
        </p>

        <div className="formula-block">
          <p>final score = 0.25GPE* + 0.25GLE* + 0.25LPE* + 0.25LLE*</p>
        </div>

        <p>
          The final score is averaged over all scans in the test set. Scores are
          reported with three decimal places, and higher scores indicate better
          performance.
        </p>

        <p>
          Additional reference scores are also reported, including global,
          local, landmark, and pixel reconstruction scores, without formal
          ranking.
        </p>

        <div className="note">
          <strong>NOTE:</strong> Zero score will be given if the code fails to
          run or metrics cannot be computed. Ties are broken by runtime, with
          shorter runtimes ranked higher. A maximum runtime of 6 hours is
          enforced. All raw metric values will be released.
        </div>
      </div>
    </div>
  );
}

export default Assessment;
