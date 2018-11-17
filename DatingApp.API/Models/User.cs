namespace DatingApp.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public string Gender { get; set; }

        public DateTime Dateofbirth { get; set; }

        public string Knownas { get; set; }

        public DateTime Membersince { get; set; }

        public DateTime LastActive { get; set; }

        public string Lookingfor { get; set; }

        public string interests { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public ICollection<Photo> Photos { get; set; }


    }
}