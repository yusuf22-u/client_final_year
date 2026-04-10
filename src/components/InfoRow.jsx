const InfoRow = ({ Icon, label, value, danger }) => (
  <div className="flex items-start gap-3">
    
    {/* Icon Box */}
    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 border border-slate-100 shadow-sm">
      <Icon
        className="w-4 h-4"
        style={{ color: danger ? "#EF4444" : "#0E7490" }}
      />
    </div>

    {/* Text */}
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p
        className="text-sm"
        style={{
          fontWeight: 500,
          color: danger ? "#EF4444" : "#334155",
        }}
      >
        {value || "N/A"}
      </p>
    </div>
  </div>
);
export default InfoRow