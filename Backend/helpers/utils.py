from passlib.context import CryptContext
from cryptography.fernet import Fernet
import pickle

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(password: str, hashed_password: str):
    return pwd_context.verify(password, hashed_password)


def encrypt_list(list):
    serialized_data = pickle.dumps(list)

    # generate a secret key for encryption
    key = b'nNjpIl9Ax2LRtm-p6ryCRZ8lRsL0DtuY0f9JeAe2wG0='
    # create a Fernet cipher object with the secret key
    cipher = Fernet(key)

    # encrypt the serialized data using the Fernet cipher
    encrypted_data = cipher.encrypt(serialized_data)
    return encrypted_data

def decrypt_list(list):
    key = b'nNjpIl9Ax2LRtm-p6ryCRZ8lRsL0DtuY0f9JeAe2wG0='

    # create a Fernet cipher object using the secret key
    cipher = Fernet(key)
    encrypted_data = encrypt_list(list)
    # decrypt the encrypted data
    decrypted_data = cipher.decrypt(encrypted_data)

    # deserialize the decrypted data into an array of objects
    array = pickle.loads(decrypted_data)

    # print the decrypted array
    return array