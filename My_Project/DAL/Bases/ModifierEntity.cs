namespace DAL.Bases;

public abstract class ModifierEntity
{
    public DateTime? CreateAt { get; set; }
    public DateTime? UpdtaeAt { get; set; }
    public bool? DeleteAt { get; set; }
}