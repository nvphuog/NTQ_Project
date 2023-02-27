using DAL.Enum;

namespace DAL.Entities;

public class WishLists
{
    public int Id { get; set; }
    public Status? Status { get; set; }
    public User User { get; set; }
    public int UserId { get; set; }
    public Products Products { get; set; }
    public int ProductId { get; set; }
}