using DAL.Bases;
using DAL.Enum;

namespace DAL.Entities;

public class User : ModifierEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string? ComFirmPassword { get; set; }
    public string? Image { get; set; }
    public int Gender { get; set; }

    // public DateTime? CreateAt { get; set; }
    // public DateTime? UpdateAt { get; set; }
    // public bool? DeleteAt { get; set; }

    public Status? Status { get; set; }


    public Role Role { get; set; }
    public int RoleId { get; set; }
    public virtual ICollection<Products> Product { get; set; }
    public ICollection<Reviews> Review { get; set; }
    public ICollection<WishLists> WishList { get; set; }
    // public ICollection<RecentlyView> RecentlyView { get; set; }

}