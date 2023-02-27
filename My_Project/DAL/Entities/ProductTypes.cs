using DAL.Bases;
using DAL.Enum;

namespace DAL.Entities;

public class ProductTypes : ModifierEntity
{
    public int Id { get; set; }
    public string Name { get; set; }

    // public DateTime? CreateAt { get; set; }
    // public DateTime? UpdateAt { get; set; }
    // public bool? DeleteAt { get; set; }
    public Status? Status { get; set; } = 0;
    public virtual ICollection<Products> Product { get; set; }
}