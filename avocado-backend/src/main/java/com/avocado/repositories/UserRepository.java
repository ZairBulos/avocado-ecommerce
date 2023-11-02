package com.avocado.repositories;

import com.avocado.entities.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends BaseRepository<User, Long> {
}
