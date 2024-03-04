package com.university.codesolution.submitcode.parameter.service;

import com.university.codesolution.submitcode.parameter.entity.Parameter;

import java.util.List;

public interface ParameterService {
    Object convertToType(String inputData, Class<?> targetType);
    Class<?> getParameterType(String inputDataType);
    Class<?>[] getParameterTypes(Object... args);
    StringBuilder createListParameter(List<Parameter> listParameters);
    List<Object> createArguments(List<Parameter> parameters);

}
