package com.university.codesolution.submitcode.parameter.service;

import com.university.codesolution.submitcode.parameter.entity.Parameter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ParameterServiceImpl implements ParameterService{
    @Override
    public Object convertToType(String inputData, Class<?> targetType) {
        return switch (targetType.getName()) {
            case "int", "java.lang.Integer" -> Integer.parseInt(inputData);
            case "double", "java.lang.Double" -> Double.parseDouble(inputData);
            case "float", "java.lang.Float" -> Float.parseFloat(inputData);
            case "long", "java.lang.Long" -> Long.parseLong(inputData);
            case "short", "java.lang.Short" -> Short.parseShort(inputData);
            case "byte", "java.lang.Byte" -> Byte.parseByte(inputData);
            case "char", "java.lang.Character" -> inputData.charAt(0);
            default -> targetType.cast(inputData);
        };
    }

    @Override
    public Class<?> getParameterType(String inputDataType) {
        if (inputDataType != null) {
            return switch (inputDataType) {
                case "int" -> int.class;
                case "double" -> double.class;
                case "float" -> float.class;
                case "long" -> long.class;
                case "short" -> short.class;
                case "byte" -> byte.class;
                case "char" -> char.class;
                default -> Object.class;
            };
        } else {
            throw new IllegalArgumentException("Null argument not supported in method invocation.");
        }
    }

    @Override
    public Class<?>[] getParameterTypes(Object... args) {
        Class<?>[] parameterTypes = new Class[args.length];
        for (int i = 0; i < args.length; i++) {
            Object arg = args[i];
            if (arg != null) {
                if (arg instanceof Integer) {
                    parameterTypes[i] = int.class;
                } else if (arg instanceof Double) {
                    parameterTypes[i] = double.class;
                } else if (arg instanceof Float) {
                    parameterTypes[i] = float.class;
                } else if (arg instanceof Long) {
                    parameterTypes[i] = long.class;
                } else if (arg instanceof Short) {
                    parameterTypes[i] = short.class;
                } else if (arg instanceof Byte) {
                    parameterTypes[i] = byte.class;
                } else if (arg instanceof Character) {
                    parameterTypes[i] = char.class;
                } else {
                    parameterTypes[i] = arg.getClass();
                }
            } else {
                throw new IllegalArgumentException("Null argument not supported in method invocation.");
            }
        }
        return parameterTypes;
    }

    @Override
    public StringBuilder createListParameter(List<Parameter> listParameters) {
        List<String> parameters = new ArrayList<>();
        StringBuilder listParameter = new StringBuilder();

        for(Parameter parameter: listParameters){
            String p = parameter.getInputDataType() + " " +
                    parameter.getName()+ ", ";
            parameters.add(p);
        }

        for(String parameter:parameters){
            listParameter.append(parameter);
        }

        return new StringBuilder(listParameter
                .substring(0, listParameter.length() - 2));
    }

    @Override
    public List<Object> createArguments(List<Parameter> parameters) {
        Class<?> aClass = getParameterType(parameters.get(0).getInputDataType());
        return parameters.stream()
                .map(Parameter::getInputData)
                .map(inputData -> convertToType(inputData, aClass))
                .collect(Collectors.toList());
    }
}
