import mongoose from "mongoose";

const supported_types = [
  "short_text",
  "long_text",
  "single_select",
  "multi_select",
  "attachment"
];

const VisibilityRuleSchema = new mongoose.Schema(
  {
    fieldKey: { type: String, required: true },
    operator: {
      type: String,
      enum: ["equals", "not_equals", "includes", "not_includes", "one_of"],
      default: "equals"
    },
    value: { type: mongoose.Schema.Types.Mixed, required: true }
  },
  { _id: false }
);

const FormFieldSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    airtableFieldId: String,
    airtableFieldName: String,
    label: { type: String, required: true },
    type: { type: String, enum: supported_types, required: true },
    required: { type: Boolean, default: false },
    options: [String],
    showWhenOperator: { type: String, enum: ["all", "any"], default: "all" },
    showWhen: [VisibilityRuleSchema]
  },
  { _id: false }
);

const formSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    owner: { type: String, required: true },
    fields: { type: [FormFieldSchema], default: [] },
    airtable: {
      tableName: { type: String },
      baseId: { type: String }
    }
  },
  { timestamps: true }
);

export default mongoose.model("Form", formSchema);