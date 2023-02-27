using DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace DAL.Database;

public class MyDbContext : DbContext
{
    public MyDbContext() {}

    public MyDbContext(DbContextOptions<MyDbContext> options) : base (options){}

    public DbSet<Role> Roles { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<ProductTypes> ProductTypes { get; set; }
    public DbSet<Products> Products { get; set; }
    public DbSet<Reviews> Reviews { get; set; }
    public DbSet<WishLists> WishLists { get; set; }
    // public DbSet<RecentlyView> RecentlyViews { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Key
        modelBuilder.Entity<Role>().HasKey(c => c.Id);
        modelBuilder.Entity<User>().HasKey(c => c.Id);
        modelBuilder.Entity<ProductTypes>().HasKey(c => c.Id);
        modelBuilder.Entity<Products>().HasKey(c => c.Id);
        modelBuilder.Entity<Reviews>().HasKey(c => c.Id);
        modelBuilder.Entity<WishLists>().HasKey(c => c.Id);
        // modelBuilder.Entity<RecentlyView>().HasKey(c => c.Id);


        // Foreign Key
        modelBuilder.Entity<User>().HasOne<Role>(c => c.Role).WithMany(c => c.User).HasForeignKey(c => c.RoleId);

        modelBuilder.Entity<Products>().HasOne<ProductTypes>(c => c.ProductType).WithMany(c => c.Product)
            .HasForeignKey(c => c.ProductTypeId);

        modelBuilder.Entity<Reviews>().HasOne<Products>(c => c.Product).WithMany(c => c.Review)
            .HasForeignKey(c => c.ProductId);

        modelBuilder.Entity<WishLists>().HasOne<User>(c => c.User).WithMany(c => c.WishList)
            .HasForeignKey(c => c.UserId);

        modelBuilder.Entity<WishLists>().HasOne<Products>(c => c.Products).WithMany(c => c.WishList)
            .HasForeignKey(c => c.ProductId);

        // 1 User có nhiều Review, 1 Product có nhiều Review
        modelBuilder.Entity<Products>().HasMany<User>(c => c.User).WithMany(c => c.Product).UsingEntity<Reviews>
        (c => c.HasOne(x => x.User).WithMany(y => y.Review).HasForeignKey(z => z.UserId).OnDelete(DeleteBehavior.Restrict),
            c => c.HasOne(a => a.Product).WithMany(c => c.Review).HasForeignKey(c => c.ProductId)
                .OnDelete(DeleteBehavior.Cascade));

        // modelBuilder.Entity<Products>().HasMany<User>(c => c.User).WithMany(c => c.Product).UsingEntity<RecentlyView>(
        //     c => c.HasOne(x => x.User).WithMany(y => y.RecentlyView).HasForeignKey(z => z.UserId)
        //         .OnDelete(DeleteBehavior.Restrict),
        //     c => c.HasOne(a => a.Product).WithMany(c => c.RecentlyView).HasForeignKey(c => c.ProductId)
        //         .OnDelete(DeleteBehavior.Cascade));


        // Role
        modelBuilder.Entity<Role>().Property(c => c.Name).HasMaxLength(256).IsRequired();
        modelBuilder.Entity<Role>().HasData(
            new {Id = 1, Name = "Admin"},
            new {Id = 2, Name = "User"} );
        // User
        modelBuilder.Entity<User>().Property(c => c.Name).HasMaxLength(256).IsRequired();
        modelBuilder.Entity<User>().Property(c => c.UserName).HasMaxLength(256).IsRequired();
        modelBuilder.Entity<User>().Property(c => c.Email).HasMaxLength(256).IsRequired();
        modelBuilder.Entity<User>().Property(c => c.Password).HasMaxLength(256).IsRequired();
        // Review
        modelBuilder.Entity<Reviews>().Property(c => c.Description).HasMaxLength(256).IsRequired();
        // Product
        modelBuilder.Entity<Products>().Property(c => c.Name).HasMaxLength(256).IsRequired();
        modelBuilder.Entity<Products>().Property(c => c.Point).HasDefaultValueSql("((0))");
        // Product Type
        modelBuilder.Entity<ProductTypes>().Property(c => c.Name).HasMaxLength(256).IsRequired();
        modelBuilder.Entity<ProductTypes>().HasData(
            new {Id = 1, Name = "Vegetable" },
            new {Id = 2, Name = "Fruits"},
            new {Id = 3, Name = "New"});
    }
}