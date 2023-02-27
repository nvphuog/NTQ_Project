using DAL.Bases;
using DAL.Enum;

namespace DAL.Entities;

public class Products : ModifierEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Slug { get; set; }
    public string Image { get; set; }
    public double Price { get; set; }
    public double Discount { get; set; }
    public bool Trending { get; set; }
    public int Amount { get; set; }
    public int? Point { get; set; }

    // public DateTime? CreateAt { get; set; }
    // public DateTime? UpdateAt { get; set; }
    // public bool? DeleteAt { get; set; }

    public Status? Status { get; set; }

    public ProductTypes ProductType { get; set; }
    public int ProductTypeId { get; set; }
    public virtual ICollection<User> User { get; set; }
    public ICollection<Reviews> Review { get; set; }
    public ICollection<WishLists> WishList { get; set; }
    // public ICollection<RecentlyView> RecentlyView { get; set; }
}