import { Search } from "lucide-react";

/** Plain GET form → /verify?name=abc&no=XXXX. Works without JavaScript. */
export default function VerifyForm({
  defaultName = "",
  defaultNo = "",
  idPrefix = "v",
}: {
  defaultName?: string;
  defaultNo?: string;
  idPrefix?: string;
}) {
  return (
    <form action="/verify" method="get" className="verify-form">
      <div className="field">
        <label htmlFor={`${idPrefix}-name`}>Company name</label>
        <input
          id={`${idPrefix}-name`}
          name="name"
          className="input"
          placeholder="First 3 letters, e.g. ABC"
          defaultValue={defaultName}
          autoComplete="off"
          required
          minLength={3}
        />
      </div>
      <div className="field">
        <label htmlFor={`${idPrefix}-no`}>Certificate no.</label>
        <input
          id={`${idPrefix}-no`}
          name="no"
          className="input"
          placeholder="Enter certificate number"
          defaultValue={defaultNo}
          autoComplete="off"
          required
          minLength={3}
        />
      </div>
      <button type="submit" className="btn btn-primary" style={{ height: 50 }}>
        <Search size={18} /> Check Status
      </button>
    </form>
  );
}
