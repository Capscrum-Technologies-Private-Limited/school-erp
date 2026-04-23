package com.capscrum.school.erp.dataaccessor.service;

import com.capscrum.school.erp.dataaccessor.dto.UserDto;

import java.util.List;
import java.util.Set;

public interface UserService {

    List<UserDto> getAllUsers();

    UserDto getUserById(String id);

    UserDto updateUser(String id, UserDto userDto);

    void deleteUser(String id);

    UserDto assignRoles(String userId, Set<String> roleNames);

    UserDto findByEmail(String email);
}
