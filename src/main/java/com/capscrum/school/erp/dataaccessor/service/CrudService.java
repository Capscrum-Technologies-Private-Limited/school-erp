package com.capscrum.school.erp.dataaccessor.service;


import com.capscrum.school.erp.dataaccessor.exception.BadRequestException;

import java.util.List;

public interface CrudService <DTO, ID> {
    DTO create(DTO entity) throws BadRequestException;
    List<DTO> getAll();
    DTO getById(ID id);
    DTO updateById(ID id, DTO entity);
    void deleteById(ID id);
}
