using System;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Models
{
    public class AuthRepository : IAuthRepository
    {
        private readonly Context _context;
        public AuthRepository(Context context)
        {
            _context = context;
        }
        public async Task<User> Login(string username, string password)
        {
            
            var user = await _context.Users.FirstOrDefaultAsync(a => a.Username == username);

            if(user == null)
            return null;

            if(!VerifyPassword(password,user.PasswordHash,user.PasswordSalt))
            return null;

            return user;
        }

        private bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
             using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
               var computedhash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
               for(int i =0; i < computedhash.Length; i++)
               {
                   if(computedhash[i] != passwordHash[i]) return false;
               }
            }
            return true;
        }

        private void CreatePasswordHash(string password, out byte[] passwordhash, out byte[] passwordsalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordsalt = hmac.Key;
                passwordhash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordhash,passwordsalt;
            CreatePasswordHash(password, out passwordhash, out passwordsalt);

            user.PasswordHash = passwordhash;
            user.PasswordSalt = passwordsalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;

        }

        public async Task<bool> UserExists(string username)
        {
            if(await _context.Users.AnyAsync(x => x.Username == username))
            return true;

            return false;
        }
    }
}