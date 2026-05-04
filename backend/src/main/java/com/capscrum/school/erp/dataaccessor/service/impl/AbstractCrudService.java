package com.capscrum.school.erp.dataaccessor.service.impl;

import com.capscrum.school.erp.dataaccessor.aspect.LogPerformance;
import com.capscrum.school.erp.dataaccessor.exception.BadRequestException;
import com.capscrum.school.erp.dataaccessor.exception.ResourceNotFoundException;
import com.capscrum.school.erp.dataaccessor.service.CrudService;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public abstract class AbstractCrudService<DTO, ID> implements CrudService<DTO, ID> {

    protected final String name;
    protected final JpaRepository<DTO, ID> repository;
    protected static final Logger log = LoggerFactory.getLogger(AbstractCrudService.class);

    public AbstractCrudService(String name, JpaRepository<DTO, ID> repository) {
        this.name = name;
        this.repository = repository;
    }

    @Override
    @Transactional
    @LogPerformance
    public DTO create(DTO entity) throws BadRequestException {
        try {
            setChildrenOnCreate(entity);
            return repository.save(entity);
        } catch (DataIntegrityViolationException e) {
            throw new BadRequestException("The request is missing required properties");
        }
    }

    @LogPerformance
    @Override
    public List<DTO> getAll() {
        return repository.findAll();
    }

    @LogPerformance
    @Override
    public DTO getById(ID id) {
        return repository.findById(id).orElseThrow(() -> {
            log.warn("{} with id {} not found", name, id);
            return new ResourceNotFoundException(name + " with id " + id + " not found");
        });
    }


    @Transactional
    @Override
    @LogPerformance
    public DTO updateById(ID id, DTO entity) {
        DTO existing = repository.findById(id).orElseThrow(() -> {
            log.warn("{} with id {} not found for update", name, id);
            return new ResourceNotFoundException(name + " with id " + id + " not found for update");
        });
        copyPropertiesOnUpdate(entity, existing);
        try {
            return repository.save(existing);
        } catch (DataIntegrityViolationException e) {
            throw new BadRequestException("The request is missing required properties");
        }
    }


    @Override
    @Transactional
    @LogPerformance
    public void deleteById(ID id) {
        try {
            if (!repository.existsById(id)) {
                log.warn("{} with id {} not found for deletion", name, id);
                throw new ResourceNotFoundException(name + " with id " + id + " not found for deletion");
            }
            repository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            log.warn("{} with id {} not found for deletion", name, id);
            throw new ResourceNotFoundException(name + " with id " + id + " not found for deletion");
        }
    }

    protected void setChildrenOnCreate(DTO entity) {
        // Default implementation does nothing, can be overridden by subclasses if needed
    }

    protected abstract void copyPropertiesOnUpdate(DTO source, DTO target);

}
