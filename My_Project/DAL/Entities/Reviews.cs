using DAL.Bases;
using DAL.Enum;

namespace DAL.Entities;

public class Reviews : ModifierEntity
{
    public int Id { get; set; }
    public string Description { get; set; }

    // public DateTime? CreateAt { get; set; }
    // public DateTime? UpdateAt { get; set; }
    // public bool? DeleteAt { get; set; }

    public Status? Status { get; set; }

    public User? User { get; set; }
    public int? UserId { get; set; }
    public Products? Product { get; set; }
    public int? ProductId { get; set; }
}